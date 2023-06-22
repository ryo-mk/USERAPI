package com.example.work9.integrationtest;

import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.spring.api.DBRider;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.Customization;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.skyscreamer.jsonassert.comparator.CustomComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;

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
                "id": 1,
                "name": "tanaka"
                },
                {
                "id": 2,
                "name": "yamada"
                },
                {
                "id": 3,
                "name": "suzuki"
                }
                ]""", response, JSONCompareMode.STRICT);
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
                "id": 1,
                "name": "tanaka"
                }
                """, response, JSONCompareMode.STRICT);
    }

    @Test
    @DataSet(value = "datasets/names.yml")
    @Transactional
    void 指定したidのユーザーが存在しない場合ステータス404を返すこと() throws Exception {
        String response = mockMvc.perform(MockMvcRequestBuilders.get("/users/99"))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
        JSONAssert.assertEquals("""
                {          
                "timestamp": "",
                "status": "404",
                "error": "Not Found",
                "message": "No user found for id: 99",
                "path": "/users/99"
                }
                """, response, new CustomComparator(JSONCompareMode.STRICT,
                new Customization("timestamp", ((expectedTimestamp, actualTimestamp) -> true))));
    }
}
