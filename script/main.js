document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
    }
});

const messages = [
    "HALOOO",
    "haii lagii kak Azra FKM Phanter (nama kontak kamu)",
    "kalo aku?",
    "kontaknya, namanya apaa?",
    "JAWAB DICHAT AKUU",
    "apa yaa, bingungg",
    "aku sebenernya ga tau harus mulai dari mana, tapi aku mau bilang makasih yaa udah hadir dan nemenin hari hari aku belakangan inii",
    "kalau dipikir pikir, lucu juga gimanaa kita awalnya bisa sampai sedeket ini, padahal awalnya cuma chat karena mau join panther",
    "waktu itu aku cuma mikirin panther, nanya nanya ini itu ke kamu karena kamu yang aku tau bisa aku tanyain",
    "tapi dari obrolan yang awalnya cuma soal panther, lama lama kita muncul TOPIK terus, cerita, saling nanyain kabar, sampai akhirnya chat sama kamu jadi sesuatu yang aku tunggu tiap harinya",
    "ga juga si, ga kutungguin, orang jahat kamunya",
    "hmmm",
    "aku bahkan suka senyum sendiri kalau tiba tiba ada notif dari kamu, sesimpel itu ternyata kamu bisa bikin hari aku jadi sedikit lebih seruu",
    "sampai aku sendiri ngga sadar kapan tepatnya kamu mulai jadi salah satu orang yang sering aku cari di hari hari aku",
    "aku ngga tau ke depannya bakal kayak gimanaa, tapi thank you udah nemenin aku sejauh ini, even baru seminggu atau baru sebentarr",
    "makasih udah bikin waktu yang sebentar ini jadi terasa berarti, dan semoga kita masih bisa terus nemenin satu sama lain lebih lamaa",
    "ngga perlu tau semuanya bakal jadi apa sekarang, jalanin aja pelan pelan dan liat nanti kita bakal sampai mana",
    "pokoknya makasih udah datang dan jadi bagian dari cerita aku akhir akhir inii",
    "semoga nanti kalau kita inget awal mula semuanya, kita bisa senyum karena ternyata dari obrolan sederhana soal panther, kita bisa sampai sejauh inii",
    "jaga diri baik baik yaa, semoga kita masih punya banyak waktu buat ngobrol, ketawa, cerita hal hal random, dan saling nemenin di hari hari berikutnyaa",
    "makasih udah jadi kamu, dan makasih udah tetap ada sampai sekarang, semoga kamu tau kalau kehadiran kamu berarti buat akuu",
    "kalo aku?",
    "kehadiran aku?",
    "wkwk apa ajaa deh",
    "ini masi ada lagii, ditunggu ya JENDRAL 1, see uuu",
];

let currentPage = 0;
let isLastPage = false;

function showMessage() {
    $('.message').text(messages[currentPage]);
    
    isLastPage = currentPage === messages.length - 1;
    
    if (isLastPage) {
        $('.next-button').show();
        $('.bg_heart').css('cursor', 'default');
    } else {
        $('.next-button').hide();
        $('.bg_heart').css('cursor', 'pointer');
    }
}

$('.bg_heart').on('click', function() {
    if (!isLastPage) {
        currentPage++;
        showMessage();
    }
});

var love = setInterval(function() {
    var r_num = Math.floor(Math.random() * 40) + 1;
    var r_size = Math.floor(Math.random() * 65) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_bg = Math.floor(Math.random() * 25) + 100;
    var r_time = Math.floor(Math.random() * 5) + 5;
    
    $('.bg_heart').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);animation:love " + r_time + "s ease'></div>");
    
    $('.bg_heart').append("<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);animation:love " + (r_time + 5) + "s ease'></div>");
    
    $('.heart').each(function() {
        var top = parseFloat($(this).css("top"));
        var width = parseFloat($(this).css("width"));
        if (top <= -100 || width >= 150) {
            $(this).remove();
        }
    });
}, 500);

showMessage();

function clearMusicState() {
    localStorage.removeItem('musicPlaying');
    localStorage.removeItem('musicCurrentTime');
}

window.onload = function() {
    clearMusicState(); 
}

function setupMusic() {
    const music = document.getElementById('backgroundMusic');
    
    if (!localStorage.getItem('initialLoad')) {
        clearMusicState();
        localStorage.setItem('initialLoad', 'true');
        music.currentTime = 0;
    }

    const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
    const musicCurrentTime = localStorage.getItem('musicCurrentTime') || 0;

    if (isMusicPlaying) {
        music.currentTime = parseFloat(musicCurrentTime);
        music.play().catch(error => console.log('Playback failed', error));
    }

    music.addEventListener('play', () => {
        localStorage.setItem('musicPlaying', 'true');
    });

    music.addEventListener('pause', () => {
        localStorage.setItem('musicPlaying', 'false');
    });

    setInterval(() => {
        localStorage.setItem('musicCurrentTime', music.currentTime);
    }, 1000);

    document.addEventListener('click', function startMusic() {
        music.play().catch(error => {
            console.log('Autoplay prevented', error);
        });
        document.removeEventListener('click', startMusic);
    });
}

document.addEventListener('DOMContentLoaded', setupMusic);