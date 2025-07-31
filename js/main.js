document.addEventListener('DOMContentLoaded', function() {
    console.log("Welcome to my enhanced portfolio site!");

    // --- 作品モーダル機能 ---
    const projectCards = document.querySelectorAll('.work-card');
    const modal = document.getElementById('projectModal');
    const closeButton = modal ? modal.querySelector('.close-button') : null;
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalDuration = document.getElementById('modal-duration');
    const modalTech = document.getElementById('modal-tech');
    const modalLink = document.getElementById('modal-link');

    // 作品データ (実際には外部ファイルやAPIから取得することも可能)
    const projectData = {
        'project1': {
            title: '企業サイトリニューアル',
            image: 'images/work-thumb1-large.jpg', // モーダル用大きい画像
            description: '既存の企業ウェブサイトを最新のデザイントレンドとレスポンシブ対応で全面リニューアルしました。ユーザーインターフェースの改善に注力し、ブランドイメージの向上に貢献しました。特に、高速なページ読み込みとSEO最適化を意識したコーディングを行っています。',
            duration: '2ヶ月',
            tech: 'HTML5, CSS3 (Sass), JavaScript, Figma, Git',
            link: 'works/project1.html'
        },
        'project2': {
            title: 'イベント管理Webアプリ',
            image: 'images/work-thumb2-large.jpg',
            description: '小規模イベントの参加者管理とチケット販売を行うWebアプリケーションを開発しました。ReactとFirebaseを使用し、リアルタイムでのデータ更新を実現しています。ユーザーが直感的に操作できるよう、UI/UXデザインにも力を入れました。',
            duration: '3ヶ月',
            tech: 'React, Firebase, Node.js, Express, Adobe XD',
            link: 'works/project2.html'
        },
        'project3': {
            title: 'ECサイト向けバナーデザイン',
            image: 'images/work-thumb3-large.jpg',
            description: 'Eコマースサイトの季節ごとのプロモーションバナーとSNS広告用クリエイティブを制作しました。視認性とクリック率の向上を目指したデザインです。ターゲット層に響く色彩とレイアウトを徹底的に研究しました。',
            duration: '1ヶ月',
            tech: 'Adobe Photoshop, Adobe Illustrator, Canva',
            link: 'works/project3.html'
        }
    };

    if (modal && closeButton) {
        // 各作品カードにクリックイベントを追加
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.dataset.projectId;
                const data = projectData[projectId];

                if (data) {
                    modalTitle.textContent = data.title;
                    modalImage.src = data.image;
                    modalDescription.textContent = data.description;
                    modalDuration.textContent = data.duration;
                    modalTech.textContent = data.tech;
                    modalLink.href = data.link;

                    modal.style.display = 'flex'; // モーダルを表示
                    document.body.style.overflow = 'hidden'; // 背景スクロールを無効に
                }
            });
        });

        // モーダルを閉じる
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // 背景スクロールを有効に
        });

        // モーダル外をクリックで閉じる
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});