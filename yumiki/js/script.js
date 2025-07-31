document.addEventListener('DOMContentLoaded', function() {
    console.log("Yumiki World Specific Script Loaded!");

    // --- charm.html のセクション切り替え ---
    const charmButtons = document.querySelectorAll('.charm-switch .charm-button');
    const charmCards = document.querySelectorAll('.charm-card');

    function showSection(sectionId) {
        charmCards.forEach(card => {
            card.style.display = 'none'; // 全てのカードを非表示
        });
        const activeCard = document.getElementById(sectionId);
        if (activeCard) {
            activeCard.style.display = 'block'; // 指定されたカードを表示
        }

        charmButtons.forEach(button => {
            button.classList.remove('active'); // 全てのボタンのアクティブ状態を解除
        });
        const activeButton = document.getElementById('btn-' + sectionId);
        if (activeButton) {
            activeButton.classList.add('active'); // クリックされたボタンをアクティブに
        }
    }

    // charm.html にいる場合のみ実行
    if (document.querySelector('.charm-page-container')) {
        if (charmButtons.length > 0 && charmCards.length > 0) {
            showSection('world'); // 初期表示セクション
        }
        charmButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const sectionId = event.target.id.replace('btn-', '');
                showSection(sectionId);
            });
        });
    }

    // --- 画像クリックで説明モーダル表示 (gallery.html 専用) ---
    const imagesWithDescription = document.querySelectorAll('.photobook-grid img, .namashashin-examples img, .favorites-grid img');
    const imageModal = document.getElementById('imageDescriptionModal'); // モーダル本体のID
    const modalImageTitle = document.getElementById('modalImageTitle');
    const modalImage = document.getElementById('modalImage');
    const modalImageDescription = document.getElementById('modalImageDescription');
    const closeImageModalButton = imageModal ? imageModal.querySelector('.close-button') : null; // モーダル内の閉じるボタン

    if (imageModal && modalImageTitle && modalImage && modalImageDescription && closeImageModalButton) {
        imagesWithDescription.forEach(img => {
            img.addEventListener('click', function () {
                const description = this.getAttribute('data-description') || this.getAttribute('alt') || '説明がありません。'; // data-description優先、なければalt
                const altText = this.getAttribute('alt') || '画像';

                modalImageTitle.textContent = altText;
                modalImage.src = this.src;
                modalImageDescription.textContent = description;

                imageModal.style.display = 'flex'; // モーダルを表示
                document.body.style.overflow = 'hidden'; // 背景スクロール無効
            });
        });

        closeImageModalButton.addEventListener('click', () => {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // 背景スクロール有効
        });

        // モーダル外をクリックで閉じる
        window.addEventListener('click', (event) => {
            if (event.target === imageModal) {
                imageModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // --- SNSモーダル（profile.html用） ---
    const snsButtons = document.querySelectorAll('.sns-icon-button[data-modal-target]');
    if (snsButtons.length > 0) {
        snsButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modalId = button.dataset.modalTarget;
                const targetModal = document.getElementById(modalId);
                if (targetModal) {
                    targetModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // 各SNSモーダルの閉じるボタンと背景の処理
        const snsModals = document.querySelectorAll('.modal'); // ページ上の全てのモーダルを取得
        snsModals.forEach(modal => {
            const closeBtn = modal.querySelector('.close-button');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                });
            }
            // モーダル外クリックで閉じる (画像説明モーダルとは独立)
            window.addEventListener('click', (event) => {
                // event.targetがモーダルで、かつそれが画像説明モーダルではない場合
                if (event.target === modal && modal.id !== 'imageDescriptionModal') { 
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }

});