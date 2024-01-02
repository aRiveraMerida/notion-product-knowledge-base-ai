import { useEffect, useState } from "react";
import { API } from "../../utils/api_axios";

const GetAll = () => {
  const [page, setPage] = useState([]);

  useEffect(() => {
    const openAIKey = import.meta.env.VITE_OPEN_AI_KEY;
    const notionKey = import.meta.env.VITE_NOTION_KEY;
    const databaseId = import.meta.env.VITE_DATABASE_ID;

    API.get(
      `/api/model/items?openAIKey=${openAIKey}&notionKey=${notionKey}&databaseId=${databaseId}`
    ).then((res) => setPage([...res.data]));
  }, []);

  return (
    <div>
      {page.map((element) => {
        return (
          <div key={element.id}>
            <h3>Category: {element.properties.Category.select.name}</h3>
            <h3>Priority: {element.properties.Priority.select.name}</h3>
            <h3>Due Date: {element.properties["Due Date"].date.start}</h3>
            <h3>Sentiment: {element.properties.Sentiment.select.name}</h3>
            <h3>Title: {element.properties.Title.plain_text}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default GetAll;
