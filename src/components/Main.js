import DishDetail from "./DishDetail";
import Menu from "./Menu";
import Header from "./Header";
import Footer from "./Footer";
import Contact from "./Contact";
import Home from "./Home";
import About from "./About";
import { useParams } from "react-router-dom";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  loadComments,
  loadDishes,
  loadPromos,
  loadLeaders,
} from "../redux/ActionCreators";
import { AnimatePresence } from "framer-motion";

export default function Main() {
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadComments());
    dispatch(loadDishes());
    dispatch(loadPromos());
    dispatch(loadLeaders());
  }, [dispatch]);

  const { dishes, comments, promotions, leaders } = useSelector(
    (store) => store
  );

  const HomePage = () => {
    return (
      <Home
        //dish
        dish={dishes.dishes?.find((dish) => dish.featured)}
        dishesLoading={dishes.isLoading}
        dishesErrMess={dishes.errMess}
        //promotion
        promotion={promotions.promotions?.find((promo) => promo.featured)}
        promotionsLoading={promotions.isLoading}
        promotionsErrMess={promotions.errMess}
        //leader
        leader={leaders.leaders?.find((leader) => leader.featured)}
        leadersLoading={leaders.isLoading}
        leadersErrMess={leaders.errMess}
      />
    );
  };

  const DishWithId = () => {
    const { dishId } = useParams();

    return (
      <DishDetail
        dish={dishes.dishes?.find((dish) => dish.id === Number(dishId))}
        comments={comments.comments?.filter(
          (comment) => comment.dishId === Number(dishId)
        )}
      />
    );
  };

  return (
    <>
      <Header />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/menu" element={<Menu dishes={dishes} />} />
          <Route exact path="/contactus" element={<Contact />} />
          <Route exact path="/menu/:dishId" element={<DishWithId />} />
          <Route exact path="/aboutus" element={<About leaders={leaders} />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}
