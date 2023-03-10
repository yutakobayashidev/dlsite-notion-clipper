import "./App.css";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios"; // APIを叩くのにaxiosを使用
import { RxNotionLogo } from "react-icons/rx";
import { Client } from "@notionhq/client";
import dayjs from "dayjs";

type Work = {
  work_name: string;
  intro_s: string;
  site_id: string;
  genres: { name: string }[];
  price: number;
  file_type: string;
  maker_name: string;
  workno: string;
  work_type_string: string;
  regist_date: string;
  age_category_string: string;
  image_main: { relative_url: string };
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [work, setWork] = useState<Work | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const rjcode = getRJCode(String(tabs[0].url));

      const fetch = async () => {
        if (rjcode) {
          const stats = await WorkData(rjcode);
          setWork(stats);
        }
      };

      fetch();
    });
  }, []);

  function getRJCode(url: string) {
    var code = url.match(/RJ\d+/);
    if (code) {
      return code[0];
    }
    return null;
  }

  async function handleClick() {
    setIsLoading(true);

    const notion = new Client({
      auth: import.meta.env.VITE_NOTION_API_KEY,
    });

    if (!work) {
      return;
    }

    const genres = work.genres.map((obj) => ({ name: obj.name }));

    const response = await notion.pages.create({
      parent: { database_id: import.meta.env.VITE_DATABASE_ID },
      cover: {
        external: {
          url: `https://img.dlsite.jp/${work.image_main.relative_url}`,
        },
      },
      icon: {
        external: {
          url: `https://img.dlsite.jp/${work.image_main.relative_url}`,
        },
      },
      properties: {
        名前: {
          title: [
            {
              text: {
                content: work.work_name,
              },
            },
          ],
        },
        Code: {
          rich_text: [
            {
              text: {
                content: work.workno,
              },
            },
          ],
        },
        ジャンル: {
          multi_select: genres,
        },
        価格: {
          number: work.price,
        },
        file_type: {
          select: {
            name: work.file_type,
          },
        },
        サークル名: {
          select: {
            name: work.maker_name,
          },
        },
        作品形式: {
          select: {
            name: work.work_type_string,
          },
        },
        販売日: {
          date: {
            start: dayjs(work.regist_date).format("YYYY-MM-DD"),
          },
        },
        年齢指定: {
          select: {
            name: work.age_category_string,
          },
        },
        DLsite: {
          url: `https://www.dlsite.com/${work.site_id}/work/=/product_id/${work.workno}.html`,
        },
        概要: {
          rich_text: [
            {
              text: {
                content: work.intro_s,
              },
            },
          ],
        },
      },
    });

    if (response) {
      chrome.tabs.create({ url: `https://www.notion.so/${response.id.replace(/-/g, "")}`});
    }    

    setIsLoading(false);
  }

  async function WorkData(rjcode: string) {
    const response = await axios.get(
      `https://www.dlsite.com/home/api/=/product.json?workno=${rjcode}`
    );

    return response.data[0];
  }

  return (
    <div className="App">
      <h1>DLsite Notion Clipper</h1>
      {work && (
        <>
          <h2>{work.work_name}</h2>
            <img
              width={280}
              height={210}
              src={`https://img.dlsite.jp/${work.image_main.relative_url}`}
              alt={work.work_name}
            />
          <div className="rj">RJ Code: {work.workno}</div>
        </>
      )}
      <div className="card">
        <button onClick={handleClick} disabled={isLoading || !work}>
          <RxNotionLogo className="notion" />
          {isLoading ? "Saving..." : work  ? "Save to Notion" :  "RJ Code not found"}
        </button>
      </div>
    </div>
  );
}

export default App;
