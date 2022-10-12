import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import React, { Suspense } from 'react';
import UserPage from "./pages/UserPage";

//Pages
const HomePage = React.lazy(() => import("./pages/HomePage"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));
const PostDetailsPage = React.lazy(() => import("./pages/PostDetailsPage"));
const CategoryPage = React.lazy(() => import("./pages/CategoryPage"));

//Users
const UserManage = React.lazy(() => import('./module/user/UserManage'));
const UserAddNew = React.lazy(() => import('./module/user/UserAddNew'));
const UserUpdate = React.lazy(() => import('./module/user/UserUpdate'));
const UserProfile = React.lazy(() => import('./module/user/UserProfile'));

//Category
const CategoryManage = React.lazy(() => import('./module/category/CategoryManage'));
const CategoryAddNew = React.lazy(() => import('./module/category/CategoryAddNew'));
const CategoryUpdate = React.lazy(() => import('./module/category/CategoryUpdate'));

//Post
const PostManage = React.lazy(() => import('./module/post/PostManage'));
const PostAddNew = React.lazy(() => import('./module/post/PostAddNew'));
const PostUpdate = React.lazy(() => import('./module/post/PostUpdate'));

//Dashboard
const DashboardLayout = React.lazy(() => import('./module/dashboard/DashboardLayout'));


function App() {
  return (



    <div>

      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>

            <Route
              path="/category/:slug"
              element={<CategoryPage></CategoryPage>}
            ></Route>


            <Route
              path="/author/:slug"
              element={<UserPage></UserPage>}
            ></Route>


            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>

              <Route
                path="/manage/posts"
                element={<PostManage></PostManage>}
              ></Route>

              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>


              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>



              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>

              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>

              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>




              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>

              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>

              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="/profile"
                element={<UserProfile></UserProfile>}
              ></Route>

            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
