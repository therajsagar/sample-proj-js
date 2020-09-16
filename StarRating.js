<html>
  <style>
    #star-div {
      display: inline-flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
      const btnWrapper = document.getElementById("star-div");
      const btnList = document.querySelectorAll(".star");

      let starIdx = 0;

      (() => {
        btnWrapper.addEventListener("click", handleClick);
        btnList.forEach((btn) => {
          btn.addEventListener("mouseenter", handleFocus);
        });
        btnWrapper.addEventListener("mouseleave", handleBlur);
      })();

      function handleFocus({ target: { dataset } }) {
        generateStars(dataset.idx);
      }

      function handleBlur() {
        generateStars();
      }

      function handleClick({ target: { dataset } }) {
        starIdx = dataset.idx;
        generateStars();
      }

      function generateStars(limitIndex = starIdx) {
        btnList.forEach((btn) => {
          const { idx } = btn.dataset;
          if (idx <= limitIndex) {
            btn.classList.add("rated");
          } else {
            btn.classList.remove("rated");
          }
        });
      }
    </script>
  </body>
</html>
