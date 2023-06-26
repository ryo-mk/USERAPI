package com.example.work9.integrationtest;

import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.ExpectedDataSet;
import com.github.database.rider.spring.api.DBRider;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.mockito.Mockito.mockStatic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DBRider
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRestApiIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @DataSet(value = "names.yml")
    @Transactional
    void ユーザーが全件取得出来ること() throws Exception {
        String response = mockMvc.perform(MockMvcRequestBuilders.get("/users"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
        JSONAssert.assertEquals("""
                [
                   {
                      "id":1,
                      "name":"tanaka"
                   },
                   {
                      "id":2,
                      "name":"yamada"
                   },
                   {
                      "id":3,
                      "name":"suzuki"
                   }
                ]
                """, response, JSONCompareMode.STRICT);
    }

    @Test
    @DataSet(value = "datasets/empty.yml")
    @Transactional
    void DBが空の時に空のリストが返されること() throws Exception {
        String response = mockMvc.perform(MockMvcRequestBuilders.get("/users"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
        JSONAssert.assertEquals("""
                []
                """, response, JSONCompareMode.STRICT);
    }

    @Test
    @DataSet(value = "datasets/names.yml")
    @Transactional
    void 指定したidのユーザーが取得できること() throws Exception {
        String response = mockMvc.perform(MockMvcRequestBuilders.get("/users/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
        JSONAssert.assertEquals("""
                {
                   "id":1,
                   "name":"tanaka"
                }
                """, response, JSONCompareMode.STRICT);
    }

    @Test
    void 指定したidのユーザーが存在しない場合ステータス404を返すこと() throws Exception {
        // ZoneDateTime.nowを固定化する
        ZonedDateTime fixedDateTime = ZonedDateTime.of(
                2023, 6, 23, 21, 0, 0, 0,
                ZoneId.systemDefault());

        try (MockedStatic<ZonedDateTime> mockedStatic = mockStatic(ZonedDateTime.class)) {
            mockedStatic.when(ZonedDateTime::now).thenReturn(fixedDateTime);
            String response = mockMvc.perform(MockMvcRequestBuilders.get("/users/99"))
                    .andExpect(MockMvcResultMatchers.status().isNotFound())
                    .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
            JSONAssert.assertEquals("""
                    {
                       "timestamp":"2023-06-23T21:00+09:00[Asia/Tokyo]",
                       "status":"404",
                       "error":"Not Found",
                       "message":"No user found for id: 99",
                       "path":"/users/99"
                    }
                    """, response, JSONCompareMode.STRICT);
        }
    }

    @Test
    @DataSet(value = "datasets/names.yml")
    @ExpectedDataSet(value = "datasets/createNames.yml", ignoreCols = "id")
    @Transactional
    void ユーザーが登録できること() throws Exception {
        String previousUser = """
                {
                   "name":"kato"
                }
                """;
        String laterUser = """
                {
                   "name":"shimura"
                }
                """;
        String expectedResponse = """
                {
                   "message":"user successfully created"
                }
                """;

        // 1回目のリクエストの検証
        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(previousUser))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(expectedResponse));

        // 2回目のリクエストの検証
        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content(laterUser))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(expectedResponse));
    }

    @Test
    void 登録時のnameがnullか空の場合登録に失敗すること() throws Exception {
        mockMvc.perform(post("/users")
                        .content("""
                                {
                                   "name":
                                }
                                """)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());

        mockMvc.perform(post("/users")
                        .content("""
                                {
                                   "name":""
                                }
                                """)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DataSet(value = "datasets/names.yml")
    @ExpectedDataSet(value = "datasets/updateNames.yml")
    @Transactional
    void 指定したidのユーザーを更新できること() throws Exception {
        String response = mockMvc.perform(patch("/users/3")
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .content("""
                                {
                                   "name":"takagi"
                                }
                                """))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
        JSONAssert.assertEquals("""
                {
                   "id":3,
                   "name":"takagi"
                }
                """, response, JSONCompareMode.STRICT);
    }

    @Test
    void 更新時のnameがnullか空の場合更新に失敗すること() throws Exception {
        mockMvc.perform(patch("/users/3")
                        .content("""
                                {
                                   "name":
                                }
                                """)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());

        mockMvc.perform(patch("/users/3")
                        .content("""
                                {
                                   "name":""
                                }
                                """)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void 更新時に指定したidのユーザーが存在しない場合ステータス404を返すこと() throws Exception {
        // ZoneDateTime.nowを固定化する
        ZonedDateTime fixedDateTime = ZonedDateTime.of(
                2023, 6, 23, 21, 0, 0, 0,
                ZoneId.systemDefault());

        // id:99、name:ダミー名を入力
        try (MockedStatic<ZonedDateTime> mockedStatic = mockStatic(ZonedDateTime.class)) {
            mockedStatic.when(ZonedDateTime::now).thenReturn(fixedDateTime);
            String response = mockMvc.perform(MockMvcRequestBuilders.patch("/users/99")
                            .contentType(MediaType.APPLICATION_JSON_VALUE)
                            .content("""
                                    {
                                       "name":"takagi"
                                    }
                                    """))
                    .andExpect(MockMvcResultMatchers.status().isNotFound())
                    .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
            JSONAssert.assertEquals("""
                    {
                       "timestamp":"2023-06-23T21:00+09:00[Asia/Tokyo]",
                       "status":"404",
                       "error":"Not Found",
                       "message":"No user found for id: 99",
                       "path":"/users/99"
                    }
                    """, response, JSONCompareMode.STRICT);
        }
    }

    @Test
    @DataSet(value = "datasets/names.yml")
    @ExpectedDataSet(value = "datasets/deleteNames.yml")
    @Transactional
    void ユーザーが削除できること() throws Exception {
        String response = mockMvc.perform(MockMvcRequestBuilders.delete("/users/3"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
        JSONAssert.assertEquals("""
                {
                   "message":"successfully deleted user with id : 3"
                }
                """, response, JSONCompareMode.STRICT);
    }

    @Test
    void 削除時に指定したidのユーザーが存在しない場合ステータス404を返すこと() throws Exception {
        // ZoneDateTime.nowを固定化する
        ZonedDateTime fixedDateTime = ZonedDateTime.of(
                2023, 6, 23, 21, 0, 0, 0,
                ZoneId.systemDefault());

        try (MockedStatic<ZonedDateTime> mockedStatic = mockStatic(ZonedDateTime.class)) {
            mockedStatic.when(ZonedDateTime::now).thenReturn(fixedDateTime);
            String response = mockMvc.perform(MockMvcRequestBuilders.delete("/users/99"))
                    .andExpect(MockMvcResultMatchers.status().isNotFound())
                    .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
            JSONAssert.assertEquals("""
                    {
                       "timestamp":"2023-06-23T21:00+09:00[Asia/Tokyo]",
                       "status":"404",
                       "error":"Not Found",
                       "message":"No user found for id: 99",
                       "path":"/users/99"
                    }
                    """, response, JSONCompareMode.STRICT);
        }
    }
}
