window.onload = function() {
  loadUpDown()
  function loadUpDown(_this) {
    var main = document.querySelector('#wrap');
    var swiper = document.querySelector('#Home');
    var load = document.querySelector('#load');
    var loadImg = load.querySelector('.loadImg');
    var loadImg2 = load.querySelector('.loadImg2');
    var loadText = load.querySelector('.loadText');
    var footLoadImg = swiper.querySelector('.footLoadImg');
    var footLoadImg2 = swiper.querySelector('.footLoadImg2');
    var footLoadText = swiper.querySelector('.footLoadText');
    var loadH = load.offsetHeight;
    var footerLoad = swiper.querySelector('#footerLoad');
    var footerLoadH = footerLoad.offsetHeight;
    var ulList = document.querySelector('#list')
    var str = '';
    var initArr = getArr();
    function getArr() {
      var arr = [];
      for (var i = 0; i < 100; i++) {
        arr.push(i);
      }
      return arr
    }
    render(initArr);
    //初始化数据
    function render(arr) {
      ulList.innerHTML = ''
      str = ''
      for (var i = 0; i < arr.length; i++) {
        str += '<li>' + arr[i] + '</li>'
      }
      ulList.innerHTML = str;
    }
    function ulLoadReader(arr) {
      for (var i = 0; i < arr.length; i++) {
        str += '<li>' + arr[i] + '</li>'
      }
      ulList.innerHTML = str;
    }

    function getRandomArr() {
      var arr = [];
      for (var i = 0; i < 100; i++) {
        arr.push(Math.floor(Math.random() * 10) + 10)
      }
      return arr;
    }

    // console.log(css(main,"translateY"));
    loadImg.style.transition = ".3s";
    footLoadImg.style.transition = ".3s";
    mScroll({
      wrap: main,
      dir: "y",
      over: 'backOut',
      showBar: false,
      start: function() {
        swiper.style.transition = "none";
      },
      move: function() {

        var now = css(swiper, "translateY");
        var mainH = swiper.offsetHeight - main.offsetHeight
        if (now > loadH) {
          css(loadImg, "rotate", -180);
          loadText.innerHTML = "释放立即刷新";
        } else {
          css(loadImg, "rotate", 0);
          loadText.innerHTML = "下拉刷新";
          // console.log(now, mainH)
          if (Math.abs(now) - 60 > mainH) {
            // console.log('加载更多1')
            css(footLoadImg, "rotate", -180);
            footLoadText.innerHTML = "释放加载更多";
          } else {
            css(footLoadImg, "rotate", 0);
            footLoadText.innerHTML = "上拉加载";
          }
        }
      },
      up: function() {
        var now = css(swiper, "translateY");
        var mainH = swiper.offsetHeight - main.offsetHeight
        if (now > loadH) {
          cancelAnimationFrame(swiper.timer);
          swiper.style.transition = ".3s";
          css(swiper, "translateY", loadH);
          loadImg.style.display = "none";
          loadImg2.style.display = "block";
          loadText.innerHTML = "正在刷新";
          swiper.addEventListener('WebkitTransitionEnd', end);
          swiper.addEventListener('transitionend', end);

          function end() {
            swiper.removeEventListener('WebkitTransitionEnd', end);
            swiper.removeEventListener('transitionend', end);
            // creatLi(true);
            loadImg2.style.display = "none";
            loadText.innerHTML = "刷新完成";
            setTimeout(function() {
              css(swiper, "translateY", 0);
              swiper.addEventListener('WebkitTransitionEnd', end);
              swiper.addEventListener('transitionend', end);

              function end() {
                swiper.removeEventListener('WebkitTransitionEnd', end);
                swiper.removeEventListener('transitionend', end);
                loadImg.style.display = "block";
                loadText.innerHTML = "下拉刷新";
              }
            }, 500);
            console.log('下拉刷新加载数据部分')
            render(getRandomArr())
          }
        } else {
          if (Math.abs(now) - 60 > mainH) {
            //上拉加载部分
            loadAll()
          }

        }
      }
    });
    //加载更多
    function loadAll() {
      var swiperH = css(swiper, 'translateY')
      cancelAnimationFrame(swiper.timer);
      swiper.style.transition = ".3s";
      // console.log(swiperH, footerLoadH);
      css(swiper, "translateY", swiperH + footerLoadH);
      footLoadImg.style.display = 'none';
      footLoadImg2.style.display = "block";
      footLoadText.innerHTML = '正在加载';
      swiper.addEventListener('WebkitTransitionEnd', end);
      swiper.addEventListener('transitionend', end);

      function end() {
        swiper.removeEventListener('WebkitTransitionEnd', end);
        swiper.removeEventListener('transitionend', end);
        // creatLi(true);
        footLoadImg2.style.display = "none";
        footLoadText.innerHTML = "加载完成";
        setTimeout(function() {
          // css(swiper, "translateY", 0);
          swiper.addEventListener('WebkitTransitionEnd', end);
          swiper.addEventListener('transitionend', end);

          function end() {
            swiper.removeEventListener('WebkitTransitionEnd', end);
            swiper.removeEventListener('transitionend', end);
            footLoadImg.style.display = "block";
            footLoadText.innerHTML = "上拉加载";
          }
        }, 500);
        console.log('上拉加载更多数据部分');
        ulLoadReader(getRandomArr())
        footLoadImg.style.display = 'block';
        footLoadText.innerHTML = '正在加载';
      }
    }
  }
}
