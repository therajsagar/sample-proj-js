const apiEndPoint = {
  listing: "https://flipkart-email-mock.now.sh/",
  body: "https://flipkart-email-mock.now.sh/?id=",
};

let state = {
  emailList: [],
  activeEmail: {},
  activeFilter: "unread",

  categorisedList: {
    read: [],
    unread: [],
    favorite: [],
  },
};

const filterButtonList = document.querySelectorAll(".filter-btn");
const emailListingWrapper = document.getElementById("email-listing-wrapper");
const emailDetailsWrapper = document.getElementById("email-detail-wrapper");

const convertToReqDateTimeFormat = (timestamp) => {
  const dateVal = new Date(timestamp);
  return (
    dateVal.toLocaleDateString() +
    "  " +
    dateVal.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  );
};

const changeFilter = ({ target }) => {
  const currActiveFilter = document.querySelector(".filter-btn.active-filter");

  if (currActiveFilter) {
    currActiveFilter.classList.remove("active-filter");
  }

  target.classList.add("active-filter");

  state = { ...state, activeFilter: target.dataset.filtervalue };

  renderEmailListing();
};

const attachFilterHandlers = () => {
  filterButtonList.forEach((filterBtn) => {
    filterBtn.addEventListener("click", changeFilter);
  });
};

const addToFavourite = () => {
  const emailMetaInfo = state.emailList.find(
    (email) => email.id === state.activeEmail.id
  );

  const ifAlreadyFavorite = state.categorisedList.favorite.some(
    (item) => item.id === emailMetaInfo.id
  );

  if (!ifAlreadyFavorite) {
    state = {
      ...state,
      categorisedList: {
        ...state.categorisedList,
        favorite: [...state.categorisedList.favorite, emailMetaInfo],
      },
    };
  }
};

const markAsRead = () => {
  const emailMetaInfo = state.emailList.find(
    (email) => email.id === state.activeEmail.id
  );

  const ifAlreadyRead = state.categorisedList.read.some(
    (item) => item.id === emailMetaInfo.id
  );

  if (!ifAlreadyRead) {
    state = {
      ...state,
      categorisedList: {
        ...state.categorisedList,
        read: [...state.categorisedList.read, emailMetaInfo],
        unread: state.categorisedList.unread.filter(
          (item) => item.id !== emailMetaInfo.id
        ),
      },
    };
  }
};

const renderEmailBody = () => {
  emailDetailsWrapper.classList.remove("hidden");
  emailDetailsWrapper.innerHTML = "";

  const emailMetaInfo = state.emailList.find(
    (email) => email.id === state.activeEmail.id
  );

  // append email header meta-info
  const emailHeader = document.createElement("div");
  emailHeader.classList.add("email-details-header");

  const emailHeadInfo = document.createElement("div");
  emailHeadInfo.classList.add("email-head-info");

  const emailAvatar = document.createElement("div");
  emailAvatar.classList.add("thumbnail-email-listing-item");
  emailAvatar.innerText = emailMetaInfo.from.name[0]?.toLocaleUpperCase();

  const emailSubject = document.createElement("div");
  emailSubject.classList.add("email-details-subject");
  emailSubject.innerText = emailMetaInfo.subject;

  emailHeadInfo.appendChild(emailAvatar);
  emailHeadInfo.appendChild(emailSubject);

  const markAsFavourite = document.createElement("button");
  markAsFavourite.classList.add("mark-as-fav-btn");
  markAsFavourite.innerText = "Mark as favorite";
  markAsFavourite.addEventListener("click", addToFavourite);

  emailHeader.appendChild(emailHeadInfo);
  emailHeader.appendChild(markAsFavourite);

  // append email-subheader
  const emailSubHeader = document.createElement("div");
  emailSubHeader.classList.add("email-details-subheader");
  emailSubHeader.innerHTML = convertToReqDateTimeFormat(emailMetaInfo.date);

  // append email-body
  const emailBody = document.createElement("div");
  emailBody.classList.add("email-details-body");
  emailBody.innerHTML = state.activeEmail.body;

  emailDetailsWrapper.appendChild(emailHeader);
  emailDetailsWrapper.appendChild(emailSubHeader);
  emailDetailsWrapper.appendChild(emailBody);
};

const getEmailBody = (id) => {
  fetch(apiEndPoint.body + id)
    .then((res) => res.json())
    .then((data) => {
      state = { ...state, activeEmail: data };
      renderEmailBody();
      markAsRead();
    });
};

const handleEmailClick = ({ currentTarget }) => {
  const currActiveEmail = document.querySelector(
    ".email-item-wrapper.email-item-active"
  );

  if (currActiveEmail) {
    currActiveEmail.classList.remove("email-item-active");
  }

  getEmailBody(currentTarget.dataset.idMail);

  currentTarget.classList.add("email-item-active");
};

const renderEmailListItem = (email) => {
  // main-email-item-wrapper
  const emailItemWrapper = document.createElement("div");
  emailItemWrapper.setAttribute("data-id-mail", email.id);
  emailItemWrapper.classList.add("email-item-wrapper");

  emailItemWrapper.addEventListener("click", handleEmailClick);

  // thumbnail-div
  const emailThumbnail = document.createElement("div");
  emailThumbnail.classList.add("thumbnail-email-listing-item");
  emailThumbnail.innerText = email.from.name[0]?.toLocaleUpperCase();
  emailItemWrapper.appendChild(emailThumbnail);

  const emailItemInfoWrapper = document.createElement("div");
  emailItemInfoWrapper.classList.add("email-item-info-wrapper");

  // email-from-info
  const emailFromInfoEl = document.createElement("div");
  emailFromInfoEl.innerHTML = `From: <strong>${email.from.name} &lt${email.from.email}&gt </strong>`;

  // email-subject-info
  const emailSubjectInfoEl = document.createElement("div");
  emailSubjectInfoEl.innerHTML = `From: <strong>${email.subject}</strong>`;

  // email-short-desc-info
  const emailShortDescInfoEl = document.createElement("div");
  emailShortDescInfoEl.innerText = email.short_description;

  // email-date-time
  const emailTimeInfoEl = document.createElement("div");
  emailTimeInfoEl.innerText = convertToReqDateTimeFormat(email.date);

  //
  // add-email
  // add-email
  // add-email
  emailItemInfoWrapper.appendChild(emailFromInfoEl);
  emailItemInfoWrapper.appendChild(emailSubjectInfoEl);
  emailItemInfoWrapper.appendChild(emailShortDescInfoEl);
  emailItemInfoWrapper.appendChild(emailTimeInfoEl);

  emailItemWrapper.appendChild(emailItemInfoWrapper);

  return emailItemWrapper;
};

const renderEmailListing = () => {
  emailListingWrapper.innerHTML = "";
  emailDetailsWrapper.classList.add("hidden");

  const emailListingFragment = document.createDocumentFragment();

  const activeFilter = state.activeFilter;
  const currentEmailList = state.categorisedList[activeFilter];

  if (!currentEmailList.length) {
    const emptyMsg = document.createElement("div");
    emptyMsg.classList.add("empty-list-msg");
    emptyMsg.innerText = "Nothing to Show";
    emailListingWrapper.appendChild(emptyMsg);

    return;
  }

  currentEmailList.forEach((email) => {
    const emailItem = renderEmailListItem(email);
    emailListingFragment.appendChild(emailItem);
  });

  emailListingWrapper.appendChild(emailListingFragment);
};

const getEmailsList = () => {
  fetch(apiEndPoint.listing)
    .then((res) => res.json())
    .then((data) => {
      state = {
        ...state,
        emailList: data.list,
        categorisedList: {
          ...state.categorisedList,
          unread: data.list,
        },
      };
      renderEmailListing();
    });
};

(() => {
  attachFilterHandlers();
  getEmailsList();
})();
