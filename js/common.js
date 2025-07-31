// 他のHTML要素から呼び出す関数（URLを渡してローディング画面に遷移）
function showLoadingScreen(destinationUrl) {
    // 講義で学んだように、loading.htmlを経由してリダイレクトします
    window.location.href = 'loading.html?redirect=' + encodeURIComponent(destinationUrl);
}

// HTML読み込み後に実行する共通処理
document.addEventListener('DOMContentLoaded', function() {

    // --- ダークモード切り替え機能 ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // ページ読み込み時に保存されたテーマを適用
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
    } else if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-mode');
    }

    // ボタンクリックでテーマを切り替える
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const newTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- ヘッダーのスクロール時の挙動 ---
    const header = document.getElementById('site-header');
    if (header) {
        // イベントリスナーを使ってスクロールを監視し、ヘッダーのクラスを変更
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- スムーススクロール ---
    // DOM操作とイベントリスナーを使って、アンカーリンクの動作を制御
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // ページ内リンククリック後にオフキャンバスメニューを閉じる
            closeOffcanvasMenu();
        });
    });

    // --- オフキャンバスメニューの開閉 ---
    const menuToggle = document.querySelector('.menu-toggle'); // ハンバーガーアイコン
    const offcanvasMenu = document.getElementById('offcanvasMenu'); // オフキャンバスメニュー本体
    const closeBtn = offcanvasMenu ? offcanvasMenu.querySelector('.closebtn') : null; // メニュー内の閉じるボタン
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

        // オフキャンバスメニュー内のリンククリック時の挙動
        const offcanvasLinks = offcanvasMenu.querySelectorAll('.offcanvas-nav a');
        offcanvasLinks.forEach(link => {
            // showLoadingScreenを使用するリンクはHTMLのonclick属性で制御されているため、
            // ここでは純粋なJSによる制御は不要です。
            // closeOffcanvasMenu()がすでに呼ばれるので、問題ありません。
            // 必要であれば、個別のリンクタイプに応じて処理を追加できます。
        });
    }

    // --- スクロールフェードイン ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInSections.forEach(section => {
        observer.observe(section);
    });

    // --- トップへ戻るボタン ---
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) { // 200pxスクロールしたら表示
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});