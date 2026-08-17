(function () {
  "use strict";

  /* ---------------- Mobile nav toggle ---------------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Header search → search.html ---------------- */
  function wireSearchForm(form) {
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input[type=text]");
      var q = input ? input.value.trim() : "";
      if (!q) return;
      window.location.href = "search.html?q=" + encodeURIComponent(q);
    });
  }
  wireSearchForm(document.getElementById("headerSearchForm"));
  wireSearchForm(document.getElementById("mobileSearchForm"));

  /* ---------------- Header search icon → expand search bar (1024–1279px) ---------------- */
  var headerSearchIcon = document.querySelector(".header-search-icon");
  var headerSearchForm = document.getElementById("headerSearchForm");
  if (headerSearchIcon && headerSearchForm) {
    headerSearchIcon.addEventListener("click", function () {
      var isOpen = headerSearchForm.classList.toggle("is-open");
      if (isOpen) headerSearchForm.querySelector("input").focus();
    });
    document.addEventListener("click", function (e) {
      if (headerSearchForm.classList.contains("is-open") && !headerSearchForm.contains(e.target) && e.target !== headerSearchIcon) {
        headerSearchForm.classList.remove("is-open");
      }
    });
  }

  /* ---------------- Product data (products_1.html 구조 반영, 24개) ---------------- */
  var PRODUCTS = {
    pet: [
      { title: "춘천 남이섬 댕댕이 펫파크 피크닉 당일치기", meta: "강원 춘천", price: "89,000", photo: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600", tags: ["춘천", "펫파크", "당일치기"] },
      { title: "강릉 안목해변 오션뷰 힐링 펫투어 1박2일", meta: "강원 강릉", price: "219,000", photo: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=600", tags: ["강릉", "오션뷰", "동반식당"] },
      { title: "수원 화성 성곽길 & 독채 한옥 스테이 1박2일", meta: "경기 수원", price: "259,000", photo: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=600", tags: ["수원", "한옥스테이", "개별마당"] },
      { title: "서울 근교 천연잔디 대형 펫파크 바베큐 투어", meta: "경기 외곽", price: "99,000", photo: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600", tags: ["서울근교", "대형견가능", "당일치기"] },
      { title: "제주 애견동반 펜션 & 독채마당 2박3일", meta: "국내 제주", price: "289,000", photo: "assets/images/hero/jeju.jpg", tags: ["제주", "독채마당", "소형중형견"] },
      { title: "강원 애견동반 글램핑 & 카라반 1박2일", meta: "국내 강원", price: "199,000", photo: "assets/images/hero/pet.jpg", tags: ["강원", "글램핑", "목줄프리존"] },
      { title: "남해 반려동반 드라이브 & 해변산책 1박2일", meta: "국내 남해", price: "219,000", photo: "assets/images/business/jeju-coast.jpg", tags: ["남해", "해변산책", "대형견가능"] },
      { title: "다낭 펫프렌들리 리조트 & 동반전용객실 3박4일", meta: "베트남 다낭", price: "1,390,000", photo: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600", tags: ["다낭", "펫프렌들리", "동반전용객실"] }
    ],
    inbound: [
      { title: "Seoul K-Culture & Bukhansan Hiking 1N2D", meta: "서울 중심", price: "189,000", photo: "assets/images/business/inbound.jpg", rating: "4.9 (48)", sold: 410, date: "2026-07-18", tags: ["Seoul", "K-Nature", "Hiking"] },
      { title: "Myeongdong K-Beauty & Street Food Night Tour", meta: "서울 명동", price: "59,000", photo: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600", rating: "5.0 (110)", sold: 610, date: "2026-07-22", tags: ["Myeongdong", "K-Beauty", "NightTour"] },
      { title: "DMZ & Imjingak Peace Tour (Day)", meta: "경기 파주", price: "89,000", rating: "4.6 (95)", sold: 520, date: "2026-07-20", tags: ["DMZ", "History", "DayTour"] },
      { title: "Busan Seaside & K-Drama Filming Spots 2N3D", meta: "부산 해운대", price: "259,000", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600", rating: "4.8 (36)", sold: 268, date: "2026-06-25", tags: ["Busan", "KTX연계", "K-Wave"] },
      { title: "Nami Island Nature & Gwangjang Market", meta: "경기 가평", price: "69,000", photo: "assets/images/business/jeju-coast.jpg", rating: "4.9 (63)", sold: 390, date: "2026-07-05", tags: ["NamiIsland", "힐링", "체험"] },
      { title: "Jeonju Hanok Village & Bibimbap Experience 1N2D", meta: "전북 전주", price: "159,000", photo: "assets/images/business/seoul-evening.jpg", rating: "4.8 (27)", sold: 190, date: "2026-07-10", tags: ["Jeonju", "Hanok", "K-Food"] },
      { title: "Gyeongju Historic Sites & Bulguksa Temple 1N2D", meta: "경북 경주", price: "179,000", photo: "assets/images/business/group.jpg", rating: "4.7 (14)", sold: 98, date: "2026-05-30", tags: ["Gyeongju", "Temple", "Heritage"] },
      { title: "Suwon Hwaseong Fortress & Market Tour", meta: "경기 수원", price: "79,000", rating: "4.7 (21)", sold: 145, date: "2026-07-02", tags: ["Suwon", "역사탐방", "미식"] }
    ],
    package: [
      { title: "다낭/호이안 프리미엄 풀빌라 가족여행 3박4일", meta: "베트남 다낭", price: "890,000", photo: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600", tags: ["다낭", "풀빌라", "가족여행", "전일정식사"] },
      { title: "북해도 온천 료칸 & 미식 탐방 2박3일", meta: "일본 삿포로", price: "1,150,000", photo: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600", tags: ["삿포로", "온천료칸", "가이세키", "노쇼핑"] },
      { title: "청정 자연 호주 시드니 & 블루마운틴 4박6일", meta: "호주 시드니", price: "2,350,000", photo: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600", tags: ["시드니", "블루마운틴", "장거리", "오페라하우스"] },
      { title: "제주도 프리미엄 렌터카 완벽 일주 2박3일", meta: "국내 제주", price: "450,000", scene: "mountain", tags: ["제주도", "자유일정", "렌터카포함"] },
      { title: "방콕/파타야 가족 리조트 여행 3박4일", meta: "태국 방콕", price: "799,000", scene: "beach", tags: ["방콕", "가족여행", "리조트"] },
      { title: "싱가포르 마리나베이 & 센토사 3박5일", meta: "싱가포르", price: "1,390,000", scene: "city", tags: ["싱가포르", "도심관광", "가족여행"] },
      { title: "세부 막탄 프라이빗 비치 리조트 3박5일", meta: "필리핀 세부", price: "990,000", scene: "beach", tags: ["세부", "프라이빗비치", "휴양"] },
      { title: "대만 타이베이/타이중 미식투어 3박4일", meta: "대만 타이베이", price: "690,000", scene: "city", tags: ["타이베이", "미식", "야시장"] },
      { title: "두바이 사막사파리 & 버즈칼리파 4박6일", meta: "UAE 두바이", price: "3,290,000", scene: "city", tags: ["두바이", "사막사파리", "특별체험"] },
      { title: "튀르키예 카파도키아 열기구 투어 6박8일", meta: "튀르키예", price: "2,890,000", scene: "mountain", tags: ["카파도키아", "열기구", "일주"] },
      { title: "발리 우붓 & 스미냑 허니문 4박6일", meta: "인도네시아 발리", price: "1,690,000", scene: "beach", tags: ["발리", "허니문", "리조트"] },
      { title: "나트랑 알마리조트 프리미엄 3박5일", meta: "베트남 나트랑", price: "990,000", scene: "beach", tags: ["나트랑", "프리미엄", "리조트"] },
      { title: "홍콩/마카오 야경 & 미식 2박3일", meta: "홍콩", price: "890,000", scene: "city", tags: ["홍콩", "야경", "미식"] },
      { title: "괌 가족동반 워터파크 리조트 3박4일", meta: "미주 괌", price: "1,590,000", scene: "beach", tags: ["괌", "워터파크", "가족여행"] },
      { title: "오사카/교토 벚꽃 투어 3박4일", meta: "일본 오사카", price: "990,000", scene: "temple", tags: ["오사카", "벚꽃", "전통문화"] },
      { title: "스위스 인터라켄 알프스 트레킹 6박8일", meta: "스위스", price: "3,890,000", scene: "mountain", tags: ["인터라켄", "트레킹", "알프스"] },
      { title: "이탈리아 로마·피렌체·베니스 7박9일", meta: "이탈리아", price: "3,690,000", scene: "city", tags: ["로마", "예술기행", "일주"] },
      { title: "이집트 카이로 피라미드 & 나일강 크루즈 6박8일", meta: "이집트", price: "2,990,000", scene: "temple", tags: ["카이로", "고대유적", "크루즈"] },
      { title: "모로코 마라케시 사하라 사막 투어 6박8일", meta: "모로코", price: "2,790,000", scene: "mountain", tags: ["마라케시", "사막투어", "이색체험"] },
      { title: "하롱베이 크루즈 & 하노이 3박4일", meta: "베트남 하노이", price: "890,000", scene: "beach", tags: ["하롱베이", "크루즈", "세계유산"] },
      { title: "몰디브 오버워터 빌라 허니문 4박6일", meta: "몰디브", price: "3,990,000", scene: "beach", tags: ["몰디브", "허니문", "오버워터빌라"] },
      { title: "캄보디아 앙코르와트 문화탐방 3박4일", meta: "캄보디아 시엠립", price: "690,000", scene: "temple", tags: ["시엠립", "세계유산", "문화탐방"] },
      { title: "라오스 루앙프라방 힐링 여행 3박4일", meta: "라오스", price: "790,000", scene: "mountain", tags: ["루앙프라방", "힐링", "소도시"] },
      { title: "미국 서부 LA·라스베가스·그랜드캐니언 6박8일", meta: "미국", price: "3,490,000", scene: "city", tags: ["LA", "서부일주", "그랜드캐니언"] }
    ],
    golf: [
      { title: "필리핀 클락 3색 무제한 라운딩 3박5일", meta: "필리핀 클락", price: "1,190,000", scene: "golf", tags: ["클락", "무제한", "추천"] },
      { title: "오키나와 오션뷰 명문 CC 골프 투어 2박3일", meta: "일본 오키나와", price: "990,000", scene: "beach", tags: ["오키나와", "2인플레이", "해변코스"] },
      { title: "제주 명품 골프 & 프라이빗 요트 투어 1박2일", meta: "국내 제주", price: "590,000", photo: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600", tags: ["제주", "VIP", "법인추천"] },
      { title: "방콕 럭셔리 골프 & 5성급 스파 휴양 3박5일", meta: "태국 방콕", price: "1,290,000", photo: "https://images.unsplash.com/photo-1592919505780-303950717480?w=600", tags: ["방콕", "오후티오프", "휴양형"] },
      { title: "다낭 몬트고메리링크스 골프투어 3박5일", meta: "베트남 다낭", price: "1,090,000", scene: "golf", tags: ["다낭", "명문코스", "추천"] },
      { title: "태국 파타야 골프 & 비치 리조트 3박5일", meta: "태국 파타야", price: "990,000", scene: "golf", tags: ["파타야", "비치리조트", "무제한"] },
      { title: "세부 골프 & 리조트 패키지 3박5일", meta: "필리핀 세부", price: "1,090,000", scene: "golf", tags: ["세부", "리조트연계", "휴양"] },
      { title: "하이난 미션힐스 골프투어 3박5일", meta: "중국 하이난", price: "1,290,000", scene: "golf", tags: ["하이난", "미션힐스", "대형코스"] },
      { title: "치앙마이 골프 & 힐링 투어 3박5일", meta: "태국 치앙마이", price: "890,000", scene: "golf", tags: ["치앙마이", "힐링", "합리적가격"] },
      { title: "후아힌 로열 골프클럽 투어 3박5일", meta: "태국 후아힌", price: "990,000", scene: "golf", tags: ["후아힌", "로열코스", "휴양"] },
      { title: "코타키나발루 오션뷰 골프 3박5일", meta: "말레이시아 코타키나발루", price: "1,190,000", scene: "golf", tags: ["코타키나발루", "오션뷰", "추천"] },
      { title: "발리 뉴쿠타 골프 & 리조트 4박6일", meta: "인도네시아 발리", price: "1,690,000", scene: "golf", tags: ["발리", "리조트연계", "휴양"] },
      { title: "미얀마 양곤 골프투어 3박5일", meta: "미얀마 양곤", price: "990,000", scene: "golf", tags: ["양곤", "이색코스", "합리적가격"] },
      { title: "오키나와 챠탄 골프 & 온천 3박4일", meta: "일본 오키나와", price: "990,000", scene: "golf", tags: ["챠탄", "온천연계", "힐링"] },
      { title: "규슈 벳푸 골프 & 온천 힐링 3박4일", meta: "일본 규슈", price: "890,000", scene: "golf", tags: ["벳푸", "온천", "힐링"] },
      { title: "제주 서귀포 오션뷰 골프투어 2박3일", meta: "국내 제주", price: "590,000", scene: "golf", tags: ["서귀포", "오션뷰", "국내"] },
      { title: "하와이 오아후 골프 & 허니문 4박6일", meta: "미주 하와이", price: "3,290,000", scene: "golf", tags: ["오아후", "허니문", "명문코스"] },
      { title: "팜스프링스 사막골프 투어 5박7일", meta: "미국 팜스프링스", price: "3,890,000", scene: "golf", tags: ["팜스프링스", "사막코스", "장거리"] },
      { title: "호주 골드코스트 골프 & 비치 4박6일", meta: "호주 골드코스트", price: "2,890,000", scene: "golf", tags: ["골드코스트", "비치리조트", "장거리"] },
      { title: "베트남 달랏 고원 골프투어 3박5일", meta: "베트남 달랏", price: "990,000", scene: "golf", tags: ["달랏", "고원코스", "선선한날씨"] },
      { title: "마카오 골프 & 카지노 리조트 2박3일", meta: "마카오", price: "890,000", scene: "golf", tags: ["마카오", "리조트", "단기일정"] },
      { title: "클락 미모사 골프 & 스파 3박5일", meta: "필리핀 클락", price: "1,190,000", scene: "golf", tags: ["클락", "스파연계", "휴양"] },
      { title: "후쿠오카 골프 & 온천 2박3일", meta: "일본 후쿠오카", price: "890,000", scene: "golf", tags: ["후쿠오카", "단기일정", "온천"] },
      { title: "방콕 카오야이 골프투어 3박5일", meta: "태국 카오야이", price: "990,000", scene: "golf", tags: ["카오야이", "자연속코스", "힐링"] }
    ],
    airhotel: [
      { title: "도쿄 긴자 중심가 쇼핑 & 미식 2박3일 에어텔", meta: "일본 도쿄", price: "890,000", photo: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600", tags: ["도쿄", "시내접근성", "조식포함"] },
      { title: "괌 투몬비치 4성급 리조트 호캉스 3박4일", meta: "미주 괌", price: "1,190,000", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600", tags: ["투몬비치", "가족여행", "렌터카특가"] },
      { title: "하와이 와이키키 오션프론트 허니문 4박6일", meta: "미주 하와이", price: "2,990,000", photo: "https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?w=600", tags: ["와이키키", "허니문특전", "스냅촬영"] },
      { title: "낭만 파리 에펠탑 뷰 부티크 호텔 5박7일", meta: "유럽 프랑스", price: "3,190,000", photo: "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=600", tags: ["파리", "유럽낭만", "중심가"] },
      { title: "오사카 신사이바시 도심 호텔 2박3일", meta: "일본 오사카", price: "690,000", scene: "city", tags: ["신사이바시", "도심접근성", "쇼핑"] },
      { title: "후쿠오카 하카타 에어텔 2박3일", meta: "일본 후쿠오카", price: "590,000", scene: "city", tags: ["하카타", "단기일정", "자유여행"] },
      { title: "방콕 수쿰빗 시내 호텔 3박4일", meta: "태국 방콕", price: "690,000", scene: "city", tags: ["수쿰빗", "시내접근성", "쇼핑"] },
      { title: "다낭 미케비치 오션뷰 리조트 3박4일", meta: "베트남 다낭", price: "890,000", scene: "beach", tags: ["미케비치", "오션뷰", "자유일정"] },
      { title: "세부 막탄 비치프론트 호텔 3박4일", meta: "필리핀 세부", price: "990,000", scene: "beach", tags: ["막탄", "비치프론트", "가족여행"] },
      { title: "싱가포르 마리나베이 시티뷰 호텔 2박3일", meta: "싱가포르", price: "990,000", scene: "city", tags: ["마리나베이", "시티뷰", "도심관광"] },
      { title: "홍콩 침사추이 야경뷰 호텔 2박3일", meta: "홍콩", price: "790,000", scene: "city", tags: ["침사추이", "야경뷰", "쇼핑"] },
      { title: "타이베이 시먼딩 도심 호텔 2박3일", meta: "대만 타이베이", price: "590,000", scene: "city", tags: ["시먼딩", "도심접근성", "야시장"] },
      { title: "나트랑 오션뷰 리조트 자유일정 3박4일", meta: "베트남 나트랑", price: "890,000", scene: "beach", tags: ["나트랑", "오션뷰", "자유일정"] },
      { title: "보라카이 화이트비치 리조트 3박4일", meta: "필리핀 보라카이", price: "1,290,000", scene: "beach", tags: ["보라카이", "화이트비치", "휴양"] },
      { title: "사이판 마이크로비치 리조트 3박4일", meta: "사이판", price: "1,390,000", scene: "beach", tags: ["사이판", "가족여행", "휴양"] },
      { title: "런던 웨스트민스터 부티크호텔 5박7일", meta: "영국 런던", price: "3,290,000", scene: "city", tags: ["런던", "도심관광", "부티크"] },
      { title: "로마 트레비분수 인근 호텔 5박7일", meta: "이탈리아 로마", price: "3,090,000", scene: "city", tags: ["로마", "도보관광", "부티크"] },
      { title: "뉴욕 맨해튼 시티뷰 호텔 4박6일", meta: "미국 뉴욕", price: "3,490,000", scene: "city", tags: ["뉴욕", "시티뷰", "자유일정"] },
      { title: "시드니 달링하버 오션뷰 호텔 4박6일", meta: "호주 시드니", price: "2,690,000", scene: "beach", tags: ["달링하버", "오션뷰", "도심접근성"] },
      { title: "몰디브 라군빌라 자유일정 4박6일", meta: "몰디브", price: "3,990,000", scene: "beach", tags: ["몰디브", "라군빌라", "허니문"] },
      { title: "발리 스미냑 비치프론트 호텔 4박6일", meta: "인도네시아 발리", price: "1,590,000", scene: "beach", tags: ["스미냑", "비치프론트", "자유일정"] },
      { title: "삿포로 스스키노 도심호텔 2박3일", meta: "일본 삿포로", price: "790,000", scene: "city", tags: ["스스키노", "도심접근성", "미식"] },
      { title: "오키나와 나하 리조트 호텔 3박4일", meta: "일본 오키나와", price: "890,000", scene: "beach", tags: ["나하", "가족여행", "휴양"] },
      { title: "코타키나발루 선셋뷰 리조트 3박4일", meta: "말레이시아 코타키나발루", price: "1,090,000", scene: "beach", tags: ["코타키나발루", "선셋뷰", "휴양"] }
    ],
    group: [
      { title: "대만 타이베이/지우펀 미식 효도여행 3박4일", meta: "대만 타이베이", price: "690,000", photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400", tags: ["지우펀", "노쇼핑", "온천포함"] },
      { title: "베트남 나트랑 3대 대가족 단독 풀빌라 투어", meta: "베트남 나트랑", price: "990,000", photo: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600", tags: ["나트랑", "단독차량", "전일정식사"] },
      { title: "서유럽 3국(프/스/이) 핵심 일주 패키지 7박9일", meta: "서유럽", price: "3,590,000", photo: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600", tags: ["서유럽", "베스트셀러", "전문가이드"] },
      { title: "큐슈 유후인 료칸 가이세키 온천 힐링 2박3일", meta: "일본 큐슈", price: "890,000", photo: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600", tags: ["유후인", "효도여행", "여유로운일정"] },
      { title: "일본 벳푸/유후인 온천 효도여행 3박4일", meta: "일본 규슈", price: "990,000", scene: "temple", tags: ["벳푸", "온천", "효도여행"] },
      { title: "홋카이도 삿포로/오타루 단체여행 4박5일", meta: "일본 홋카이도", price: "1,590,000", scene: "mountain", tags: ["오타루", "자연경관", "단체할인"] },
      { title: "태국 방콕/파타야 효도관광 3박5일", meta: "태국", price: "890,000", scene: "temple", tags: ["방콕", "노쇼핑", "효도여행"] },
      { title: "필리핀 보홀/세부 가족여행 3박5일", meta: "필리핀", price: "990,000", scene: "beach", tags: ["보홀", "가족여행", "휴양"] },
      { title: "베트남 다낭/후에 문화탐방 3박4일", meta: "베트남", price: "790,000", scene: "temple", tags: ["후에", "문화탐방", "전일정식사"] },
      { title: "캄보디아 앙코르와트 단체탐방 3박4일", meta: "캄보디아", price: "690,000", scene: "temple", tags: ["앙코르와트", "세계유산", "전문가이드"] },
      { title: "중국 장가계 계림 산수화 여행 4박5일", meta: "중국", price: "1,290,000", scene: "mountain", tags: ["장가계", "절경", "단체할인"] },
      { title: "하롱베이/사파 소수민족 마을 4박5일", meta: "베트남", price: "990,000", scene: "mountain", tags: ["사파", "세계유산", "이색체험"] },
      { title: "몽골 초원 게르 체험 단체여행 4박5일", meta: "몽골", price: "1,190,000", scene: "mountain", tags: ["몽골", "게르체험", "이색체험"] },
      { title: "튀르키예 이스탄불/카파도키아 일주 7박9일", meta: "튀르키예", price: "2,990,000", scene: "mountain", tags: ["이스탄불", "일주", "전문가이드"] },
      { title: "동유럽 3국 프라하/부다페스트/빈 7박9일", meta: "동유럽", price: "2,890,000", scene: "city", tags: ["프라하", "베스트셀러", "전문가이드"] },
      { title: "스페인/포르투갈 이베리아 일주 8박10일", meta: "스페인", price: "3,690,000", scene: "city", tags: ["이베리아", "일주", "장거리"] },
      { title: "북유럽 4국 일주 9박11일", meta: "북유럽", price: "4,290,000", scene: "mountain", tags: ["북유럽", "일주", "장거리"] },
      { title: "국내 남도 일주 효도관광 3박4일", meta: "국내 전남", price: "490,000", scene: "temple", tags: ["남도", "효도여행", "국내"] },
      { title: "국내 동해안 일주 단체여행 2박3일", meta: "국내 강원", price: "350,000", scene: "mountain", tags: ["동해안", "국내", "단체할인"] },
      { title: "경주/부산 역사탐방 단체여행 2박3일", meta: "국내 경상", price: "390,000", scene: "temple", tags: ["경주", "역사탐방", "국내"] },
      { title: "기업 워크숍 제주 단체연수 2박3일", meta: "국내 제주", price: "450,000", scene: "mountain", tags: ["제주", "워크숍", "국내"] },
      { title: "대만 화련/타이루거 협곡 단체여행 3박4일", meta: "대만", price: "790,000", scene: "mountain", tags: ["화련", "협곡트레킹", "자연경관"] },
      { title: "라오스 루앙프라방 문화탐방 4박5일", meta: "라오스", price: "990,000", scene: "temple", tags: ["루앙프라방", "문화탐방", "여유로운일정"] },
      { title: "미얀마 바간 불교유적 단체탐방 4박5일", meta: "미얀마", price: "1,090,000", scene: "temple", tags: ["바간", "불교유적", "이색체험"] }
    ]
  };

  var CATEGORY_LABELS = {
    pet: "반려동물 동반여행",
    inbound: "인바운드",
    package: "패키지 · 골프 · 단체",
    golf: "골프 · 테마여행",
    airhotel: "항공 · 호텔",
    group: "단체 · 효도여행"
  };

  var CATEGORY_SHORT_LABELS = {
    pet: "반려동반",
    inbound: "인바운드",
    package: "패키지",
    golf: "골프",
    airhotel: "항공·호텔",
    group: "단체"
  };

  function thumbMedia(item) {
    var src = item.photo || "assets/images/forest.jpg";
    return '<img src="' + src + '" alt="' + item.title + '" loading="lazy">';
  }

  function productCard(item) {
    var region = item.meta ? item.meta.split(" ")[0] : "";
    var catLabel = CATEGORY_SHORT_LABELS[item.cat] || "";
    var titleTag = region && catLabel ? "[" + region + " " + catLabel + "] " : "";
    var hashtags = item.tags.map(function (t) { return "#" + t; }).join(" ");
    var detailHref = item.cat === "inbound" ? "inbound-detail.html" : item.cat === "pet" ? "pet-detail.html" : "product-detail.html";
    var ratingHtml = item.rating ? '<div class="rating">★ ' + item.rating + "</div>" : "";
    return (
      '<a class="product-card" data-cat="' + item.cat + '" href="' + detailHref + '">' +
      '<div class="thumb">' +
      thumbMedia(item) +
      "</div>" +
      '<div class="product-body">' +
      '<div class="location">' + item.meta + "</div>" +
      '<div class="title">' + titleTag + item.title + "</div>" +
      ratingHtml +
      '<div class="price-row"><span class="price">' + item.price + "원~</span></div>" +
      '<div class="hashtags">' + hashtags + "</div>" +
      "</div>" +
      "</a>"
    );
  }

  function getProductsFor(tab, categories) {
    if (tab === "all") {
      var keys = categories && categories.length ? categories : Object.keys(PRODUCTS);
      return keys.reduce(function (acc, key) {
        (PRODUCTS[key] || []).forEach(function (item) { item.cat = key; });
        return acc.concat(PRODUCTS[key] || []);
      }, []);
    }
    (PRODUCTS[tab] || []).forEach(function (item) { item.cat = tab; });
    return PRODUCTS[tab] || [];
  }

  /* Expose the catalog so page-specific scripts (e.g. search.js) can reuse
     the same PRODUCTS data and card markup instead of duplicating it. */
  window.AnytourCatalog = { getProductsFor: getProductsFor, productCard: productCard, renderPagination: renderPagination };

  function sortProducts(list, sort) {
    if (!sort) return list;
    return list.slice().sort(function (a, b) {
      return sort === "latest" ? new Date(b.date) - new Date(a.date) : (b.sold || 0) - (a.sold || 0);
    });
  }

  /* Wires a .sort-toggle button group; calls onChange(sort) on click and
     returns a getter for the currently active sort key. */
  function wireSortToggle(toggleEl, onChange) {
    if (!toggleEl) return function () { return null; };
    var active = toggleEl.querySelector(".sort-toggle-btn.is-active") || toggleEl.querySelector(".sort-toggle-btn");
    var current = active ? active.dataset.sort : "sold";
    toggleEl.querySelectorAll(".sort-toggle-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        toggleEl.querySelectorAll(".sort-toggle-btn").forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        current = btn.dataset.sort;
        onChange(current);
      });
    });
    return function () { return current; };
  }

  function renderPagination(container, totalPages, currentPage, onChange) {
    if (!container) return;
    if (totalPages <= 1) { container.innerHTML = ""; return; }
    var html = '<button type="button" class="page-btn" data-page="prev"' + (currentPage === 1 ? " disabled" : "") + '>‹</button>';
    for (var p = 1; p <= totalPages; p++) {
      html += '<button type="button" class="page-btn' + (p === currentPage ? " active" : "") + '" data-page="' + p + '">' + p + "</button>";
    }
    html += '<button type="button" class="page-btn" data-page="next"' + (currentPage === totalPages ? " disabled" : "") + '>›</button>';
    container.innerHTML = html;
    container.querySelectorAll(".page-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var val = btn.dataset.page;
        onChange(val === "prev" ? currentPage - 1 : val === "next" ? currentPage + 1 : parseInt(val, 10));
      });
    });
  }

  /* Tabbed grids (index.html teaser, products.html full listing) */
  document.querySelectorAll(".tabbar[id]").forEach(function (tabbar) {
    var gridId = tabbar.dataset.grid || "productGrid";
    var grid = document.getElementById(gridId);
    if (!grid) return;

    var buttons = tabbar.querySelectorAll("button");
    var categories = tabbar.dataset.categories ? tabbar.dataset.categories.split(",") : null;
    var pagination = document.getElementById(gridId + "Pagination");
    var countEl = document.getElementById(gridId + "Count");
    var getSort = wireSortToggle(document.getElementById(gridId + "SortToggle"), function () {
      currentPage = 1;
      renderPage();
    });
    var PER_PAGE = 10;
    var currentTab = null;
    var currentPage = 1;

    function renderPage() {
      var items = sortProducts(getProductsFor(currentTab, categories), getSort());
      if (countEl) countEl.textContent = items.length;
      var totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
      if (currentPage > totalPages) currentPage = totalPages;
      var start = (currentPage - 1) * PER_PAGE;
      grid.innerHTML = items.slice(start, start + PER_PAGE).map(productCard).join("");
      renderPagination(pagination, totalPages, currentPage, function (p) {
        currentPage = p;
        renderPage();
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    function activate(tab) {
      buttons.forEach(function (b) { b.classList.toggle("active", b.dataset.tab === tab); });
      currentTab = tab;
      currentPage = 1;
      renderPage();
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        activate(btn.dataset.tab);
        if (tabbar.dataset.hashSync) {
          history.replaceState(null, "", "#" + btn.dataset.tab);
        }
      });
    });

    var initialTab = null;
    if (tabbar.dataset.hashSync && location.hash) {
      var hashTab = location.hash.replace("#", "");
      if (hashTab === "all" || PRODUCTS[hashTab]) initialTab = hashTab;
    }
    if (!initialTab) {
      var activeBtn = tabbar.querySelector("button.active") || buttons[0];
      initialTab = activeBtn ? activeBtn.dataset.tab : null;
    }
    if (initialTab) activate(initialTab);
  });

  /* Single-category static grids (pet-travel.html, inbound.html recommendations) */
  document.querySelectorAll(".product-grid[data-category]").forEach(function (grid) {
    var limit = grid.dataset.limit ? parseInt(grid.dataset.limit, 10) : null;
    var countEl = document.getElementById(grid.id + "Count");
    var getSort = wireSortToggle(document.getElementById(grid.id + "SortToggle"), render);

    function render() {
      var items = sortProducts(getProductsFor(grid.dataset.category, null), getSort());
      if (countEl) countEl.textContent = items.length;
      grid.innerHTML = (limit ? items.slice(0, limit) : items).map(productCard).join("");
    }

    render();
  });

  /* ---------------- Sticky header shadow on scroll ---------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.style.boxShadow = window.scrollY > 4 ? "0 4px 16px rgba(16,40,80,0.08)" : "none";
    });
  }

  /* ---------------- Contact form (demo only — no backend wired yet) ---------------- */
  var contactForm = document.getElementById("contactForm");
  var contactSuccess = document.getElementById("contactSuccess");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (contactSuccess) {
        contactSuccess.classList.add("is-visible");
        contactSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      contactForm.reset();
    });
  }

  /* ---------------- Review list (reviews.html) ---------------- */
  var REVIEWS = [
    { rating: 5, title: "강아지랑 처음 떠난 국내 여행, 걱정 없었어요", date: "2026.07.24", category: "pet", photo: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=600", tripTitle: "제주 반려동반 펜션 여행", tripRating: "5.0(29)", tripScene: "pet" },
    { rating: 5, title: "항공 규정까지 꼼꼼하게 챙겨주셔서 감사했어요", date: "2026.07.20", category: "pet", photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", tripTitle: "다낭 반려동반 리조트", tripRating: "5.0(7)", tripScene: "beach" },
    { rating: 5, title: "통역 가이드 덕분에 편하게 다녀왔습니다", date: "2026.07.18", category: "inbound", photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600", tripTitle: "Seoul City & Culture Tour", tripRating: "5.0(14)", tripScene: "city" },
    { rating: 4, title: "일정이 알차고 가이드분이 친절하셨어요", date: "2026.07.15", category: "inbound", photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600", tripTitle: "Korea Nature & Temple Stay", tripRating: "4.8(9)", tripScene: "temple" },
    { rating: 5, title: "부모님 모시고 간 효도여행, 정말 만족했어요", date: "2026.07.12", category: "group", photo: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400", tripTitle: "동남아 효도 패키지", tripRating: "5.0(21)", tripScene: "temple" },
    { rating: 5, title: "그린피 포함이라 가격도 합리적이었어요", date: "2026.07.09", category: "golf", photo: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400", tripTitle: "다낭·호이안 골프 패키지", tripRating: "4.9(11)", tripScene: "golf" },
    { rating: 4, title: "왕복 항공 포함이라 예약이 편했어요", date: "2026.07.05", category: "airhotel", photo: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400", tripTitle: "방콕·파타야 자유여행", tripRating: "4.7(18)", tripScene: "beach" },
    { rating: 5, title: "강아지 전용 마당이 있어서 너무 좋았어요", date: "2026.07.02", category: "pet", photo: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=600", tripTitle: "강원 애견동반 글램핑", tripRating: "5.0(6)", tripScene: "mountain" },
    { rating: 5, title: "기업 워크숍 단체여행 준비가 완벽했습니다", date: "2026.06.28", category: "group", photo: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600", tripTitle: "기업 워크숍 단체여행", tripRating: "5.0(4)", tripScene: "mountain" },
    { rating: 4, title: "쇼핑 코스가 알차고 통역도 만족스러웠어요", date: "2026.06.24", category: "inbound", photo: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600", tripTitle: "K-Beauty & Shopping Tour", tripRating: "4.6(13)", tripScene: "city" },
    { rating: 5, title: "제주도 마당 넓은 펜션이라 뛰어놀기 좋았어요", date: "2026.06.20", category: "pet", photo: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=600", tripTitle: "제주 반려동반 펜션 여행", tripRating: "5.0(29)", tripScene: "pet" },
    { rating: 4, title: "치앙마이 날씨도 좋고 코스 관리가 잘 되어 있었어요", date: "2026.06.18", category: "golf", photo: "https://images.unsplash.com/photo-1592919505780-303950717480?w=600", tripTitle: "치앙마이 골프·힐링 투어", tripRating: "4.8(8)", tripScene: "golf" },
    { rating: 5, title: "오사카 자유일정이라 우리 페이스대로 다닐 수 있었어요", date: "2026.06.15", category: "airhotel", photo: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600", tripTitle: "오사카 항공+호텔 자유일정", tripRating: "4.9(10)", tripScene: "city" },
    { rating: 5, title: "부산 해안 투어 코스가 정말 예뻤어요", date: "2026.06.12", category: "inbound", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600", tripTitle: "Busan Coastal Discovery", tripRating: "5.0(6)", tripScene: "beach" },
    { rating: 4, title: "대만 문화 탐방 일정이 알찼습니다", date: "2026.06.10", category: "group", photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600", tripTitle: "대만 단체 문화탐방", tripRating: "4.7(7)", tripScene: "city" },
    { rating: 5, title: "강아지 검역 서류까지 꼼꼼히 챙겨주셨어요", date: "2026.06.08", category: "pet", photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", tripTitle: "다낭 반려동반 리조트", tripRating: "5.0(7)", tripScene: "beach" },
    { rating: 5, title: "세부 리조트 조식이 훌륭했습니다", date: "2026.06.05", category: "golf", photo: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600", tripTitle: "세부 골프 리조트 패키지", tripRating: "5.0(5)", tripScene: "golf" },
    { rating: 4, title: "쇼핑 코스 동선이 효율적이었어요", date: "2026.06.02", category: "inbound", photo: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600", tripTitle: "K-Beauty & Shopping Tour", tripRating: "4.6(13)", tripScene: "city" },
    { rating: 5, title: "삿포로 온천호텔 너무 좋았어요", date: "2026.05.30", category: "airhotel", photo: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600", tripTitle: "삿포로 항공+호텔 패키지", tripRating: "5.0(3)", tripScene: "mountain" },
    { rating: 5, title: "남도 일주 식사가 다 맛있었어요", date: "2026.05.28", category: "group", photo: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600", tripTitle: "효도관광 남도 일주", tripRating: "5.0(9)", tripScene: "temple" },
    { rating: 4, title: "글램핑장 시설이 깨끗했어요", date: "2026.05.25", category: "pet", photo: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=600", tripTitle: "강원 애견동반 글램핑", tripRating: "5.0(6)", tripScene: "mountain" },
    { rating: 5, title: "가이드분이 한국 문화를 잘 설명해주셨어요", date: "2026.05.22", category: "inbound", photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600", tripTitle: "Seoul City & Culture Tour", tripRating: "5.0(14)", tripScene: "city" },
    { rating: 4, title: "방콕 공항 픽업이 편리했어요", date: "2026.05.20", category: "airhotel", photo: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400", tripTitle: "방콕·파타야 자유여행", tripRating: "4.7(18)", tripScene: "beach" },
    { rating: 5, title: "워크숍 장소 선정이 탁월했습니다", date: "2026.05.18", category: "group", photo: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600", tripTitle: "기업 워크숍 단체여행", tripRating: "5.0(4)", tripScene: "mountain" },
    { rating: 5, title: "남해 드라이브 코스 추천 감사해요", date: "2026.05.15", category: "pet", photo: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600", tripTitle: "남해 반려동반 드라이브 여행", tripRating: "5.0(5)", tripScene: "pet" },
    { rating: 5, title: "다낭 골프 캐디분이 친절했어요", date: "2026.05.12", category: "golf", photo: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400", tripTitle: "다낭·호이안 골프 패키지", tripRating: "4.9(11)", tripScene: "golf" },
    { rating: 4, title: "템플스테이 체험이 특별했어요", date: "2026.05.10", category: "inbound", photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600", tripTitle: "Korea Nature & Temple Stay", tripRating: "4.8(9)", tripScene: "temple" },
    { rating: 5, title: "노쇼핑 일정이라 편했어요", date: "2026.05.08", category: "group", photo: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400", tripTitle: "동남아 효도 패키지", tripRating: "5.0(21)", tripScene: "temple" }
  ];

  var reviewGrid = document.getElementById("reviewGrid");
  if (reviewGrid) {
    var reviewCountEl = document.getElementById("reviewCount");
    var categoryFilter = document.getElementById("reviewCategoryFilter");
    var ratingFilter = document.getElementById("reviewRatingFilter");
    var searchInput = document.getElementById("reviewSearchInput");
    var sortSelect = document.getElementById("reviewSort");
    var pagePrev = document.getElementById("reviewPagePrev");
    var pageNext = document.getElementById("reviewPageNext");
    var pageInfo = document.getElementById("reviewPageInfo");
    var PER_PAGE = 24;
    var currentPage = 1;

    function starString(n) {
      return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
    }

    function reviewCard(item, idx) {
      var media = '<img src="' + (item.photo || "assets/images/forest.jpg") + '" alt="' + item.title + '" loading="lazy">';
      var categoryLabel = CATEGORY_SHORT_LABELS[item.category] || "";
      return (
        '<article class="review-photo-card" data-idx="' + idx + '">' +
        '<div class="photo">' +
        media +
        '<span class="multi"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 21h14V7"/></svg></span>' +
        "</div>" +
        '<div class="stars">' + starString(item.rating) + "</div>" +
        '<div class="title">' + item.title + "</div>" +
        '<div class="date">' + item.date + "</div>" +
        '<div class="category-tag">' + categoryLabel + "</div>" +
        "</article>"
      );
    }

    function getFiltered() {
      var cat = categoryFilter ? categoryFilter.value : "all";
      var minRating = ratingFilter ? parseInt(ratingFilter.value, 10) : 0;
      var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
      var list = REVIEWS.filter(function (r) {
        var okCat = cat === "all" || r.category === cat;
        var okRating = !minRating || r.rating >= minRating;
        var okQuery = !query || r.title.toLowerCase().includes(query);
        return okCat && okRating && okQuery;
      });
      var sort = sortSelect ? sortSelect.value : "latest";
      if (sort === "rating") {
        list = list.slice().sort(function (a, b) { return b.rating - a.rating; });
      }
      return list;
    }

    var currentPageItems = [];

    function render() {
      var list = getFiltered();
      var totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
      if (currentPage > totalPages) currentPage = totalPages;
      var start = (currentPage - 1) * PER_PAGE;
      var pageItems = list.slice(start, start + PER_PAGE);
      currentPageItems = pageItems;

      reviewGrid.innerHTML = pageItems.length
        ? pageItems.map(reviewCard).join("")
        : '<p class="review-empty">조건에 맞는 후기가 없습니다.</p>';

      if (reviewCountEl) reviewCountEl.textContent = list.length;
      if (pageInfo) pageInfo.textContent = currentPage + " / " + totalPages;
      if (pagePrev) pagePrev.disabled = currentPage <= 1;
      if (pageNext) pageNext.disabled = currentPage >= totalPages;
    }

    [categoryFilter, ratingFilter, sortSelect].forEach(function (el) {
      if (el) el.addEventListener("change", function () { currentPage = 1; render(); });
    });
    if (searchInput) searchInput.addEventListener("input", function () { currentPage = 1; render(); });
    if (pagePrev) pagePrev.addEventListener("click", function () { currentPage--; render(); reviewGrid.scrollIntoView({ behavior: "smooth", block: "start" }); });
    if (pageNext) pageNext.addEventListener("click", function () { currentPage++; render(); reviewGrid.scrollIntoView({ behavior: "smooth", block: "start" }); });

    var searchExpand = document.getElementById("reviewSearchExpand");
    var searchToggle = document.getElementById("reviewSearchToggle");
    if (searchExpand && searchToggle) {
      searchToggle.addEventListener("click", function () {
        var isOpen = searchExpand.classList.toggle("is-open");
        if (isOpen) searchInput.focus();
      });
    }

    var reviewModal = document.getElementById("reviewModal");
    var viewedReviewItem = null;
    if (reviewModal) {
      reviewGrid.addEventListener("click", function (e) {
        var card = e.target.closest(".review-photo-card");
        if (!card) return;
        var item = currentPageItems[parseInt(card.dataset.idx, 10)];
        if (!item) return;
        viewedReviewItem = item;
        document.getElementById("modalPhoto").src = item.photo || "assets/images/forest.jpg";
        document.getElementById("modalStars").textContent = starString(item.rating);
        document.getElementById("modalTitle").textContent = item.title;
        document.getElementById("modalDate").textContent = item.date;
        document.getElementById("modalCategory").textContent = CATEGORY_SHORT_LABELS[item.category] || "";
        reviewModal.showModal();
      });
      var reviewModalClose = document.getElementById("reviewModalClose");
      if (reviewModalClose) reviewModalClose.addEventListener("click", function () { reviewModal.close(); });
      reviewModal.addEventListener("click", function (e) { if (e.target === reviewModal) reviewModal.close(); });
    }

    /* ---------------- Review write / edit modal (비회원 리뷰 작성·수정) ---------------- */
    var reviewWriteBtn = document.getElementById("reviewWriteBtn");
    var reviewEditBtn = document.getElementById("reviewEditBtn");
    var reviewWriteModal = document.getElementById("reviewWriteModal");
    if (reviewWriteModal) {
      var rwMode = "create";
      var rwModalTitle = document.getElementById("rwModalTitle");
      var rwSubmitBtn = document.getElementById("rwSubmitBtn");
      var rwCategory = document.getElementById("rwCategory");
      var rwTitle = document.getElementById("rwTitle");

      var reviewWriteModalClose = document.getElementById("reviewWriteModalClose");
      if (reviewWriteModalClose) reviewWriteModalClose.addEventListener("click", function () { reviewWriteModal.close(); });
      reviewWriteModal.addEventListener("click", function (e) { if (e.target === reviewWriteModal) reviewWriteModal.close(); });

      var rwRating = 0;
      var starButtons = document.getElementById("rwStarPicker").querySelectorAll("button");
      function setRwRating(n) {
        rwRating = n;
        starButtons.forEach(function (b) { b.classList.toggle("active", parseInt(b.dataset.star, 10) <= rwRating); });
      }
      starButtons.forEach(function (btn) {
        btn.addEventListener("click", function () { setRwRating(parseInt(btn.dataset.star, 10)); });
      });

      var rwPhotos = document.getElementById("rwPhotos");
      var rwPhotoPreview = document.getElementById("rwPhotoPreview");
      rwPhotos.addEventListener("change", function () {
        if (rwPhotos.files.length > 4) {
          alert("사진은 최대 4장까지 첨부할 수 있습니다.");
          rwPhotos.value = "";
          rwPhotoPreview.innerHTML = "";
          return;
        }
        rwPhotoPreview.innerHTML = Array.from(rwPhotos.files).map(function (file) {
          return '<img src="' + URL.createObjectURL(file) + '" alt="">';
        }).join("");
      });

      function openReviewForm(mode, item) {
        rwMode = mode;
        rwModalTitle.textContent = mode === "edit" ? "리뷰 수정" : "리뷰 작성";
        rwSubmitBtn.textContent = mode === "edit" ? "수정 완료" : "리뷰 등록";
        reviewWriteForm.reset();
        rwPhotoPreview.innerHTML = "";
        setRwRating(mode === "edit" && item ? item.rating : 0);
        if (mode === "edit" && item) {
          rwCategory.value = item.category || "";
          rwTitle.value = item.title || "";
        }
        reviewWriteModal.showModal();
      }

      if (reviewWriteBtn) reviewWriteBtn.addEventListener("click", function () { openReviewForm("create", null); });

      if (reviewEditBtn) {
        reviewEditBtn.addEventListener("click", function () {
          var pw = window.prompt("본인 확인을 위해 비밀번호를 입력해 주세요. (데모 화면이므로 아무 값이나 입력하면 통과됩니다)");
          if (!pw) return;
          reviewModal.close();
          openReviewForm("edit", viewedReviewItem);
        });
      }

      var reviewWriteForm = document.getElementById("reviewWriteForm");
      var rwSuccess = document.getElementById("rwSuccess");
      var rwSuccessText = document.getElementById("rwSuccessText");
      reviewWriteForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!rwRating) {
          alert("별점을 선택해 주세요.");
          return;
        }
        rwSuccessText.textContent = rwMode === "edit" ? "후기가 수정되었습니다. 감사합니다!" : "소중한 후기가 등록되었습니다. 감사합니다!";
        rwSuccess.classList.add("is-visible");
        reviewWriteForm.reset();
        setRwRating(0);
        rwPhotoPreview.innerHTML = "";
      });
    }

    render();
  }

  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
