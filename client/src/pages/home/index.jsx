import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

import classes from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  const fetchListOfBlogs = async () => {
    setPending(true);
    const response = await axios.get("http://localhost:5000/api/blogs");
    const result = await response.data;
    console.log(result);

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  };

  const handleDeleteBlog = async (getCurrentId) => {
    const response = await axios.delete(
      `http://localhost:5000/api/blogs/delete/${getCurrentId}`
    );
    const result = await response.data;

    if (result?.message) {
      fetchListOfBlogs();
    }
  };

  const handleEditBlog = async (getCurrentBlogItem) => {
    console.log("currentItem:", getCurrentBlogItem);
    navigate("/add-blog", { state: { getCurrentBlogItem } });
    // const response = await axios.post(
    //   `http://localhost:5000/api/blogs/update/${getCurrentId}`
    // );
    // const result = await response.data;
    // console.log(result);
  };

  useEffect(() => {
    fetchListOfBlogs();
  }, []);
  return (
    <div className={classes.wrapper}>
      <h1>Blog List</h1>
      {pending ? (
        <h1>Loading Blogs! Please wait</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList && blogList.length > 0 ? (
            blogList.map((blogItem) => (
              <div key={blogItem._id}>
                <p>{blogItem.title}</p>
                <p>{blogItem.description}</p>
                <FaEdit size={30} onClick={() => handleEditBlog(blogItem)} />
                <FaTrash
                  size={30}
                  onClick={() => handleDeleteBlog(blogItem._id)}
                />
              </div>
            ))
          ) : (
            <p>No blogs available</p>
          )}
        </div>
      )}
    </div>
  );
};
export default Home;
