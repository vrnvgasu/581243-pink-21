'use strict';
(() => {
  const WORK_PANEL_ACTIVE_CLASS = `main-nav__work-panel--active`;
  const UPLOAD_ITEM_CLASS = `upload__item`;
  const NAV_TOGGLE_CLOSE_CLASS = `menu-toggle--close`;
  const MAIN_NAV_CLOSE_CLASS = `main-nav__list--close`;
  const POPUP_ACTIVE_CLASS = `popup--active`;
  const UPLOAD_ITEM_ACTIVE_CLASS = `upload__item--active`;
  const SCALE_ACTIVE_CLASS = `scale--active`;

  let menuToggleElement = document.querySelector(`.menu-toggle`);
  let mainNavWorkPanelElement = document.querySelector(`.main-nav__work-panel`);
  let mainNavListElement = document.querySelector(`.main-nav__list`);
  let formMainElement = document.querySelector(`.form--main`);
  let submitMainElement = document.querySelector(`.form--main .button--success`);
  let popupSuccessElement = document.querySelector(`.popup-success`);
  let popupErrorElement = document.querySelector(`.popup-error`);
  let popupButtonSuccessElement = document.querySelector(`.popup__button.button--success`);
  let mainNavToggleElement = document.querySelector(`.main-nav__toggle`);
  let uploadItemElements = document.querySelectorAll(`.upload__item`);
  let scaleElements = document.querySelectorAll(`.scale`);

  let closeMenu = () => {
    menuToggleElement.classList.remove(NAV_TOGGLE_CLOSE_CLASS);
    mainNavListElement.classList.add(MAIN_NAV_CLOSE_CLASS);
    mainNavWorkPanelElement.classList.add(WORK_PANEL_ACTIVE_CLASS);
  }

  let openMenu = () => {
    menuToggleElement.classList.add(NAV_TOGGLE_CLOSE_CLASS);
    mainNavListElement.classList.remove(MAIN_NAV_CLOSE_CLASS);
    mainNavWorkPanelElement.classList.remove(WORK_PANEL_ACTIVE_CLASS);
  }

  let menuToggleElementOnClick = (evt) => {
    evt.preventDefault();
    mainNavToggleElement.blur();

    if (evt.target.classList.contains(NAV_TOGGLE_CLOSE_CLASS)) {
      closeMenu();

      return;
    }

    openMenu();
  };

  let submitMainElementOnClick = (evt) => {
    if (!formMainElement.checkValidity()) {
      evt.preventDefault();
      popupErrorElement.classList.add(POPUP_ACTIVE_CLASS);

      return;
    }

    popupErrorElement.classList.remove(POPUP_ACTIVE_CLASS);
  };

  let popupButtonSuccessElementOnClick = (evt) => {
    popupSuccessElement.classList.remove(POPUP_ACTIVE_CLASS);
    popupErrorElement.classList.remove(POPUP_ACTIVE_CLASS);
  };

  menuToggleElement.addEventListener(`click`, menuToggleElementOnClick);
  mainNavToggleElement.addEventListener(`click`, (evt) => evt.preventDefault());
  mainNavToggleElement.addEventListener(`keydown`, (evt) => {
    evt.preventDefault();

    if (evt.keyCode === 13) {
      menuToggleElement.click();
    }
  });

  if (formMainElement) {
    submitMainElement.addEventListener(`click`, submitMainElementOnClick);
    popupButtonSuccessElement.addEventListener(`click`, popupButtonSuccessElementOnClick);
  }

  if (uploadItemElements.length) {
    document.addEventListener(`click`, (evt) => {
        let target = evt.target;

        while (target.tagName !== 'BODY') {
          if (target.classList.contains(UPLOAD_ITEM_CLASS)) {
            Array.from(uploadItemElements).forEach(item => {
              item.classList.remove(UPLOAD_ITEM_ACTIVE_CLASS);
            });

            target.classList.add(UPLOAD_ITEM_ACTIVE_CLASS);

            Array.from(scaleElements).forEach(item => {
              if (item.parentElement.classList.contains(UPLOAD_ITEM_ACTIVE_CLASS)) {
                item.classList.add(SCALE_ACTIVE_CLASS);
              } else {
                item.classList.remove(SCALE_ACTIVE_CLASS);
              }
            });

            break;
          }

          target = target.parentElement;
        }
    });
  }

  closeMenu();
})();
