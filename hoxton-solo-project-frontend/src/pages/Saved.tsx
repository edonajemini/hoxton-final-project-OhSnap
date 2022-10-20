// export default function Saved( { blogs, setBlogs, currentUser }: Props) {
//     return (
//       <main className='main'>
//           <div className='my-posts'>
//               <h1 className='my-posts-h1'>My Posts</h1>
//               {posts.reverse().filter(post => post.userId === currentUser.id).map((post) => (
//                   <ItemRow currentUser={currentUser} post={post} setPosts={setPosts}/>
//               ))}
//           </div>
//       </main>
//     )
//   }