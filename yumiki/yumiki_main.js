// ローディング画面遷移関数
function showLoadingScreen(destinationUrl) {
    window.location.href = 'loading.html?redirect=' + encodeURIComponent(destinationUrl);
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    // --- charm.html のセクション切り替え ---
    function showSection(sectionId) {
      const sections = ["world", "talk", "effort", "summary"];
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = (id === sectionId ? "block" : "none");
      });
    }
  
    ["world", "talk", "effort", "summary"].forEach(id => {
      const btn = document.getElementById("btn-" + id);
      if (btn) btn.addEventListener("click", () => showSection(id));
    });
  
    // --- スクロールフェードイン ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeInSections.forEach(section => observer.observe(section));
  
    // --- 画像クリックで説明モーダル表示 ---
    const imagesWithDescription = document.querySelectorAll('.photobook-grid img, .namashashin-examples img, .favorites-grid img');
    const modal = document.getElementById('imageDescriptionModal');
    const descriptionText = document.getElementById('descriptionText');
    const closeImageModalButton = document.querySelector('.modal .close-button');
  
    if (modal && descriptionText && closeImageModalButton) {
      imagesWithDescription.forEach(img => {
        img.addEventListener('click', function () {
          const description = this.getAttribute('data-description');
          if (description) {
            descriptionText.textContent = description;
            modal.style.display = 'flex';
          }
        });
      });
  
      closeImageModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
      });
  
      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  
    // --- 右上メニュー（offcanvas）を開いたら左上メニューボタンを非表示に ---
    const offcanvasRight = document.getElementById('offcanvasNavTopRight');
    const topLeftMenuButton = document.querySelector('.menu-dropbtn');
  
    if (offcanvasRight && topLeftMenuButton) {
      offcanvasRight.addEventListener('show.bs.offcanvas', () => {
        topLeftMenuButton.style.display = 'none';
      });
  
      offcanvasRight.addEventListener('hidden.bs.offcanvas', () => {
        topLeftMenuButton.style.display = 'block';
      });
    }
  
    // --- 左上メニュー（.overlay）制御 ---
    const menuOpenBtn = document.querySelector('.menu-dropbtn');
    const fullScreenMenu = document.getElementById('fullScreenMenu');
    const closeOverlayBtn = document.querySelector('.overlay .closebtn');
  
    if (menuOpenBtn && fullScreenMenu && closeOverlayBtn) {
      menuOpenBtn.addEventListener('click', function (event) {
        event.preventDefault();
        fullScreenMenu.style.display = 'flex';
        fullScreenMenu.style.height = '100%';
        document.body.style.overflow = 'hidden';
  
        // 開いたとき：右上メニューアイコンを非表示にする
        const rightMenuBtn = document.querySelector('.menu-icon-button');
        if (rightMenuBtn) {
          rightMenuBtn.style.display = 'none';
        }
      });
  
      closeOverlayBtn.addEventListener('click', function (event) {
        event.preventDefault();
        fullScreenMenu.style.height = '0%';
        fullScreenMenu.addEventListener('transitionend', function handler() {
          fullScreenMenu.style.display = 'none';
          fullScreenMenu.removeEventListener('transitionend', handler);
        });
        document.body.style.overflow = 'auto';
  
        // 閉じたとき：右上メニューアイコンを再表示
        const rightMenuBtn = document.querySelector('.menu-icon-button');
        if (rightMenuBtn) {
          rightMenuBtn.style.display = 'inline-block';
        }
      });
  
      const overlayLinks = document.querySelectorAll('.overlay-nav a');
      overlayLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
          event.preventDefault();
          const destinationUrl = this.getAttribute('href');
  
          fullScreenMenu.style.height = '0%';
          fullScreenMenu.addEventListener('transitionend', function handler() {
            fullScreenMenu.style.display = 'none';
            fullScreenMenu.removeEventListener('transitionend', handler);
            document.body.style.overflow = 'auto';
  
            // 閉じたとき：右上メニューアイコンを再表示
            const rightMenuBtn = document.querySelector('.menu-icon-button');
            if (rightMenuBtn) {
              rightMenuBtn.style.display = 'inline-block';
            }
  
            if (destinationUrl && destinationUrl !== '#' && destinationUrl !== 'javascript:void(0)') {
              showLoadingScreen(destinationUrl);
            }
          });
        });
      });
    }
  });
  // --- 右上オフキャンバスメニューの開閉 ---
const menuToggle = document.getElementById('mobile-menu-toggle'); // ハンバーガーアイコン
const offcanvasMenu = document.getElementById('offcanvasMenu'); // オフキャンバスメニュー本体
const closeBtn = document.getElementById('close-offcanvas'); // メニュー内の閉じるボタン
const menuBackdrop = document.getElementById('menuBackdrop'); // 背景を暗くするオーバーレイ

// メニューを閉じるための共通関数
const closeOffcanvasMenu = () => {
    if (offcanvasMenu) {
        offcanvasMenu.classList.remove('is-open'); // メニューを非表示
    }
    if (menuToggle) {
        menuToggle.classList.remove('is-active'); // ハンバーガーアイコンを元に戻す
    }
    if (menuBackdrop) {
        menuBackdrop.classList.remove('is-active'); // 背景オーバーレイを非表示
    }
    document.body.style.overflow = 'auto'; // スクロールを有効にする
};

if (menuToggle && offcanvasMenu && closeBtn && menuBackdrop) {
    // メニューを開く
    menuToggle.addEventListener('click', () => {
        offcanvasMenu.classList.add('is-open'); // メニューを表示
        menuToggle.classList.add('is-active'); // ハンバーガーアイコンをXに
        menuBackdrop.classList.add('is-active'); // 背景オーバーレイを表示
        document.body.style.overflow = 'hidden'; // スクロールを無効にする
    });

    // メニュー内の閉じるボタンをクリックで閉じる
    closeBtn.addEventListener('click', closeOffcanvasMenu);

    // 背景オーバーレイをクリックで閉じる
    menuBackdrop.addEventListener('click', closeOffcanvasMenu);

    // メニュー内のリンクをクリックした後にメニューを閉じる
    const offcanvasLinks = offcanvasMenu.querySelectorAll('.offcanvas-nav a');
    offcanvasLinks.forEach(link => {
      link.addEventListener('click', function(e){
        // showLoadingScreenが呼ばれる前にメニューを閉じる
        setTimeout(closeOffcanvasMenu, 100);
      });
    });
}