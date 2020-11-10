import React, { useState, useEffect } from "react";
import "../App.scss";
import { Header } from "../components/Header";
import { ImageCard } from "../components/ImageCard";
import { Loader } from "../components/Loader";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export const MainScreen = () => {
  const [images, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [count, setCount] = useState();

  console.log(images.length);

  useEffect(() => {
    fetchImages();
  }, [query]);

  const fetchImages = async (count = 10) => {
    if (query === "") {
      setLoading(true);
    }
    await axios
      .get(`https://www.reddit.com/r/${query}/top.json`)
      .then((res) => {
        setCount(res.data.data.children);

        console.log("Lenght is, ", res.data.data.children.length);
        setImage([...images, ...res.data.data.children]);
        setLoading(false);
      });
  };

  return (
    <div>
      <Header />
      <div className="input">
        <input
          placeholder="Enter query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={images.length}
          next={fetchImages}
          hasMore={true}
          loader={<Loader />}
        >
          <div className="wrapper-images">
            {images.map((image) => (
              <ImageCard url={image.data.thumbnail} key={image.data.id} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};
