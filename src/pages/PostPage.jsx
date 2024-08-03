import avatarSVG from "../assets/avatar.svg";
import verifiedSVG from "../assets/verified.svg";
import threeDotsSVG from "../assets/threeDots.svg";
import Comment from "../components/Comment";
import Actions from "../components/Actions";

const PostPage = ({postImg, likes, replies, postTitle}) => {

  postImg = "/peter.jpg";
  postTitle = "Post Title test test...";

  return <> 
  <div className="flex flex-col w-full">

    <div className="flex items-center w-full">     
      <div className="flex w-16 rounded-full border-2 border-greenM1 p-1">
          <img src={avatarSVG} alt="user avatar"/>
      </div>
      <div className="flex justify-between w-full ml-4">
        <div className="flex gap-2 items-center">
          <h3 className="text-xl font-bold">Full Username</h3>
          <img src={verifiedSVG} alt="verified" />
        </div>
        <div className="flex gap-4 items-center">
          <h3 className="text-md font-bold text-grayM">1D</h3>
          <img src={threeDotsSVG} alt="three"/>
        </div>
      </div>           
    </div>

    <div className="my-4">
      <h3 className="text-md font-bold mb-2">{postTitle}</h3>
    </div>

    <div className="flex flex-col w-full gap-2">
      {postImg &&(
      <div className="border border-greenM1 rounded  overflow-hidden">
        <img className="w-full" src={postImg}/>
      </div>)}
      < Actions/> 
      <div className="flex items-center gap-3 ml-2 text-grayM font-semibold">
        <h2>{likes} Likes</h2>
        <div className="w-1 h-1 bg-grayM rounded-full"></div>
        <h2>{replies} Replies</h2>
      </div>          
    </div>

    <hr className="my-4 border-greenM1"/>

    <div className="flex justify-between items-center py-2">
        <div className="items-center gap-4">
          <span className="text-xl">👋</span>
          <span className="text-grayM text-lg font-semibold">Get the app to like, reply anp post!</span>
        </div>
        <button className="rounded bg-greenM1 py-2 px-8 font-semibold text-grayM hover:bg-opacity-70">
          Get
        </button>
    </div>

    <hr className="my-4 border-greenM1"/>

  </div>
  
  <Comment 
    comment="This is the content of the post..." 
    createdAt="1D" 
    likes={27} 
    replies={40} 
    username="Spiderman"/>
  <Comment 
    comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." 
    createdAt="1W" 
    likes={17} 
    replies={3} 
    username="John Cena"/>
  <Comment 
    comment="Test asd test tedt test comment my comment asdasd test" 
    createdAt="2D" 
    likes={81} 
    replies={23} 
    username="Peter Parker"/>
  <Comment 
    comment="This is the content of the post This is the content of the postThis is the content of the postThis is the content of the post..." 
    createdAt="1W" 
    likes={305} 
    replies={191} 
    username="Mary Jane"/>


  </>
  
}

export default PostPage