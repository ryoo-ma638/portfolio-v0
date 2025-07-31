// loading.js
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercent = document.querySelector('.loading-percent');
  
    function getRedirectUrl() {
      const params = new URLSearchParams(window.location.search);
      return params.get('redirect') || 'index.html';
    }
    const redirectUrl = getRedirectUrl();
  
    function updateProgress(progress) {
      loadingProgress.style.width = `${progress}%`;
      loadingPercent.textContent = `${Math.floor(progress)}%`;
    }
  
    const startLoadingAnimation = () => {
      return new Promise(resolve => {
        let progress = 0;
        const totalDuration = 2500; // ローディングの合計時間 (ミリ秒)を短縮
        const intervalTime = 20; // 更新間隔を短く
  
        const interval = setInterval(() => {
          progress += (100 / totalDuration) * intervalTime;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            resolve();
          }
          updateProgress(progress);
        }, intervalTime);
      });
    };
  
    const finishLoading = () => {
      loadingScreen.classList.add('fade-out-bright');
      loadingScreen.addEventListener('transitionend', function handler() {
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          window.location.href = 'index.html';
        }
        loadingScreen.removeEventListener('transitionend', handler);
      });
    };
  
    class Preloader {
      constructor() {
        this.assets = [];
        this.loadedAssets = 0;
        this.callback = null;
  
        this.collectAssets();
        if (this.assets.length === 0) {
          this.onLoadComplete();
        }
      }
  
      collectAssets() {
        document.querySelectorAll('img').forEach(img => {
          if (!img.complete) {
            this.assets.push(img);
          }
        });
      }
  
      onLoad(callback) {
        this.callback = callback;
        if (this.assets.length === 0) {
          this.callback();
          return;
        }
  
        this.assets.forEach(asset => {
          asset.onload = () => this.assetLoaded();
          asset.onerror = () => this.assetLoaded();
        });
      }
  
      assetLoaded() {
        this.loadedAssets++;
        if (this.loadedAssets >= this.assets.length && this.callback) {
          setTimeout(() => this.callback(), 300); // 遅延も短縮
        }
      }
  
      onLoadComplete() {
        if (this.callback) {
          this.callback();
        }
      }
    }
  
    const preloader = new Preloader();
    preloader.onLoad(() => {
      startLoadingAnimation().then(() => {
        finishLoading();
      });
    });
  
    window.addEventListener('load', () => {
      if (preloader.loadedAssets < preloader.assets.length) {
        preloader.onLoadComplete();
      }
    });
  });