import React, { useEffect, useState } from "react";
import classes from "./BlogSettingComponent.module.scss";
import { BlogProps } from "../../../shared.types";
import { addNewBlog, deleteBlog, getAllBlogs } from "../../../utils/blogService";

const BlogSettingComponent: React.FC = () => {

    const [blogList, setBlogList] = useState<BlogProps[]>([]);
    const [title, setTitle] = useState<string>("");
    const [blogPictureUrl, setBlogPictureUrl] = useState<string>("");
    const [text, setText] = useState<string>("")

    useEffect(() => {

        getAllBlogs().then((response) => {
            setBlogList(response);
        })
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const blogData: Omit<BlogProps, 'id' | 'createdAt'> = {
            title,
            blogPictureUrl,
            text
        };

        try {
            await addNewBlog(blogData);
            const updatedDescriptionList = await getAllBlogs();
            setBlogList(updatedDescriptionList);

            setTitle("");
            setBlogPictureUrl("");
            setText("");
        } catch (error) {
            console.error(error);
        }
    };

    const deleteBlogHandler = async (blogId: number) => {
        try {
            await deleteBlog(blogId);
            const updatedDescriptionList = await getAllBlogs();
            setBlogList(updatedDescriptionList);
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className={classes.container}>
            <h1>Додати новий блог</h1>
            <form onSubmit={handleSubmit}>
                <div className={classes.textAreaBlock}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} name="title" type="text" placeholder="Введіть заголовок блогу" />
                    <input value={blogPictureUrl} onChange={(e) => setBlogPictureUrl(e.target.value)} name="blogPictureUrl" type="text" placeholder="Введіть URL обкладенки блогу" />
                    <textarea value={text} onChange={(e) => setText(e.target.value)} name="text" placeholder="Введіть текст блогу" />
                    <button type="submit">Зберегти</button>
                </div>
            </form>

            <div className={classes.blogList}>
                {blogList ? (
                    <ol>
                        {blogList.map((blog) => (

                            <li className={classes.descriptionItem} key={blog.id}>
                                <div className={classes.descriptionText}>
                                    {blog.title}
                                </div>

                                <svg onClick={() => deleteBlogHandler(blog.id)} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M42 8H32C32 5.794 30.206 4 28 4H20C17.794 4 16 5.794 16 8H6V12H42V8Z" />
                                    <path d="M22 36H18V16H10V40.286C10 42.334 11.794 44 14 44H34C36.206 44 38 42.334 38 40.286V16H30V36H26V16H22V36Z" />
                                </svg>
                            </li>

                        ))}
                    </ol>
                ) : (<div>error</div>)}
            </div>
        </div>
    )
}

export default BlogSettingComponent;