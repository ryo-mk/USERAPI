import React, { useState, useEffect } from "react";

export const ApiFetch = () => {
	const [stones, setStone] = useState([]);

	useEffect(() => {
		// APIをfetchする(呼び出す)
		fetch("http://localhost:8080/users", { method: "GET" })
			// レスポンスのデータ形式をjsonに設定
			.then((res) => res.json())
			// APIから渡されるレスポンスデータ(data)をstateにセットする
			.then((data) => {
				setStone(data);
			});
	}, []);

	return (
		<div></div>
	);
};
