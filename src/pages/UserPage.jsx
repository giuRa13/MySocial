import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {
  return <>

    <UserHeader/>
    <UserPost likes={723} replies={311} postImg="/peter.jpg" postTitle="PostTitle1"/>
    <UserPost likes={143} replies={72} postImg="/ai_processor.jpg" postTitle="ai generated processor"/>
    <UserPost likes={1003} replies={37} postImg="/cat.jpg" postTitle="this is a cat"/>

  </>
}

export default UserPage