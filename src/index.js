import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams,
} from "react-router-dom";



import { getToken, clearToken, hitAPI } from "./api";

import { Title } from "./components"
import "./styles.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
const [user, setUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  

  // useEffect(() => {
  //   hitAPI("GET", "/posts")
  //     .then((data) => {
  //       const { posts } = data;
  //       // console.log(posts);
        
  //     })
  //     .catch(console.error);
  // }, []);

  // function filteredPosts() {
  //   return postList.filter((post) => {
  //     return (
  //       post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       post.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       post.price.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   });
  // }

  // return (
  //   <Router>
  //     <div className="app">
  //       <header className="nav"> 
  //         {/* <Title /> */}
  //         {/* {isLoggedIn ? (
  //           <>
  //             <NavButtons />
  //             <button
  //               className="logOut"
  //               onClick={() => {
  //                 clearToken();
  //                 setIsLoggedIn(false);
  //               }}
  //             >
  //               LOG OUT
  //             </button>
  //           </>
  //         ) : (
  //           <Auth setIsLoggedIn={setIsLoggedIn} />
  //         )}
  //       </header>

  //       <div className="search">
  //         <input
  //           type="text"
  //           value={searchTerm}
  //           onChange={(event) => setSearchTerm(event.target.value)}
  //           placeholder="Search by Title, Location or Price"
  //         />
  //       </div>

  //       <main className="main">

  //         {/* <section className="sideBar"> */}
  //           {/* <Route exact path="/home"> */}
  //             {/* <NewPost */}
  //               {/* // isLoggedIn={isLoggedIn} */}
  //               {/* // postList={postList} */}
  //               {/* // setPostList={setPostList} */}
  //             {/* /> */}
  //           {/* </Route> */}
  //           {/* <Route exact path="/workout"> */}
  //             {/* {isLoggedIn ? <NewMessage post={activePost} /> : null} */}
  //           {/* </Route> */}
  //           {/* <Route exact path="/messages">
  //             <MessageList messageList={messageList} />
  //           </Route> */}
  //         {/* </section> */}
  //       {/* </main> */}
  //     </div>
  //   </Router>
  // );
  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Navbar bg="light">
            <Navbar.Brand href="/home">DTQ15</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link>
                <Link to="/routines">Routines</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/activities">Activities</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/my-routines">My Routines</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/my-activities">My Activities</Link>
              </Nav.Link>
            </Nav>

            <Button
              variant="outline-secondary"
              size="sm"
              className="logOut"
              onClick={() => {
                clearToken();
                setIsLoggedIn(false);
              }}
            >
              Log Out
            </Button>
          </Navbar>
        </>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setUser={setUser}/>
      )}
      
      <Switch>
        <Route path="/routines">
          <Routines user={user}/>
        </Route>
        <Route path="/activities">
          <Activities user={user}/>
        </Route>
        <Route path="/my-routines">
          <MyRoutines user={user}/>
        </Route>
        <Route path="/my-activities">
          <MyActivities user={user}/>
        </Route>
      </Switch>
    <Title />
    </Router>
  )
};

ReactDOM.render(<App />, document.getElementById("app"));