<html>
  <style>
    #star-div {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .star {
      margin: 10;
      height: 60px;
      width: 60px;
      background-color: silver;
      border-radius: 50%;
      border: 1.25px solid #000;
      outline: none;
      cursor: pointer;
    }
    .rated {
      background-color: gold;
    }
  </style>

  <body>
    <div id="star-div">
      <button class="star" data-idx="1" />
      <button class="star" data-idx="2" />
      <button class="star" data-idx="3" />
      <button class="star" data-idx="4" />
      <button class="star" data-idx="5" />
    </div>

    <script>
      const btnList = document.querySelectorAll(".star");
      btnList.forEach((btn) => {
        btn.addEventListener("click", ratingGenerator);
        btn.addEventListener("mouseenter", ratingGenerator);
      });

      function ratingGenerator({ target: { dataset } }) {
        const limit = dataset.idx;
        btnList.forEach((btn) => {
          const { idx } = btn.dataset;
          if (idx <= limit) {
            btn.classList.add("rated");
          } else {
            btn.classList.remove("rated");
          }
        });
      }
    </script>
  </body>
</html>
