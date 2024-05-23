import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import NotFound from "../pages/NotFound";
import AuthPage from "../pages/AuthPage";

export const privateRoutes = [
    {path: '/about', component: <About/>, exact: false},
    {path: '', component: <Posts/>, exact: true},
    {path: '/posts', component: <Posts/>, exact: true},
    {path: '/posts/:id', component: <PostIdPage/>, exact: true},
    {path: '*', component: <NotFound/>, exact: false},
]

export const publicRoutes = [
    {path: '/about', component: <About/>, exact: false},
    {path: '*', component: <AuthPage/>, exact: false},
]