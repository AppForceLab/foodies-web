import { useDispatch, useSelector } from 'react-redux';
import { Back } from '..';
import { routes } from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { getIsLoggedIn } from '../../redux/auth/authSelectors';
import { getImagePath } from '../../helpers/getImagePath';
import { getPathWithId } from '../../helpers/getPathWithId';
import styles from './RecipeCard.module.scss';
import { MODAL_TYPES } from '../../constants/common';
import { openModal } from '../../redux/modal/modalSlice';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favorites/favoritesOperations.js';
import { getFavorites } from '../../redux/favorites/favoritesSelector.js';
import { useEffect, useState } from 'react';

const RecipeCard = ({
  title,
  description,
  owner,
  img,
  id,
  status,
  handleRemoveFromFavorites,
  handleAddToFavorites,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const favorites = useSelector(getFavorites);

  const goToRecipe = () => {
    navigate(getPathWithId(routes.recipe, id));
  };

  const userOpenHendler = () => {
    if (isLoggedIn) {
      navigate(`/user/${owner._id}`);
    } else {
      dispatch(openModal({ modalType: MODAL_TYPES.LOGIN, modalProps: {} }));
    }
  };

  return (
    <li key={id} className={styles.card}>
      <img src={getImagePath(img)} alt={title} className={styles.img} />
      <h3 className={styles.title}>
        {title.slice(0, 22)}
        {title.length > 22 && <span>...</span>}
      </h3>
      <p className={styles.description}>{description.slice(0, 70)}...</p>
      <div className={styles.cardFooter}>
        <button
          className={styles.ownerInfo}
          type="button"
          onClick={userOpenHendler}
        >
          <img
            className={styles.avatar}
            src={getImagePath(owner?.avatar)}
            alt="Avatar"
          />
          <p className={styles.name}>{owner?.name}</p>
        </button>
        <div className={styles.actionsBlock}>
          {isLoggedIn && status && (
            <Back
              icon="icon-heart"
              fill="red"
              stroke="red"
              onClick={() => handleRemoveFromFavorites(id)}
            />
          )}
          {isLoggedIn && !status && (
            <Back icon="icon-heart" onClick={() => handleAddToFavorites(id)} />
          )}

          <Back
            className={styles.heardBtn}
            icon="icon-arrow-up-right"
            onClick={goToRecipe}
          />
        </div>
      </div>
    </li>
  );
};
export default RecipeCard;
