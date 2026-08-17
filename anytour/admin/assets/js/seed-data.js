/* ==========================================================================
   Shared demo seed data for the admin prototype pages.
   In-memory only (no backend/localStorage) -- reloading a page resets it,
   consistent with the rest of this prototype's "데모 목적" pattern.
   Product entries mirror ../user/assets/js/common.js PRODUCTS for realism.
   ========================================================================== */

var CATEGORY_LABELS = {
  pet: "반려동물 동반여행",
  inbound: "인바운드",
  package: "패키지",
  golf: "골프·테마",
  airhotel: "항공·호텔",
  group: "단체·효도여행"
};

var PRODUCTS_SEED = [
  { id: "p1", category: "pet", region: "국내 제주", title: "제주 애견동반 펜션 & 독채마당 2박3일", price: "289,000", tags: "제주,독채마당,소형중형견", createdAt: "2026-07-18 10:20" },
  { id: "p2", category: "pet", region: "강원 강릉", title: "강릉 안목해변 오션뷰 힐링 펫투어 1박2일", price: "219,000", tags: "강릉,오션뷰,동반식당", createdAt: "2026-07-15 09:05" },
  { id: "p3", category: "pet", region: "베트남 다낭", title: "다낭 펫프렌들리 리조트 & 동반전용객실 3박4일", price: "1,390,000", tags: "다낭,펫프렌들리,동반전용객실", createdAt: "2026-07-10 14:30" },
  { id: "p4", category: "inbound", region: "서울 중심", title: "Seoul K-Culture & Bukhansan Hiking 1N2D", price: "189,000", tags: "Seoul,K-Nature,Hiking", createdAt: "2026-07-20 11:00" },
  { id: "p5", category: "inbound", region: "서울 명동", title: "Myeongdong K-Beauty & Street Food Night Tour", price: "99,000", tags: "Myeongdong,K-Beauty,NightTour", createdAt: "2026-07-19 16:40" },
  { id: "p6", category: "package", region: "베트남 다낭", title: "다낭/호이안 프리미엄 풀빌라 가족여행 3박4일", price: "890,000", tags: "다낭,풀빌라,가족여행", createdAt: "2026-07-12 10:00" },
  { id: "p7", category: "package", region: "일본 삿포로", title: "북해도 온천 료칸 & 미식 탐방 2박3일", price: "1,150,000", tags: "삿포로,온천료칸,가이세키", createdAt: "2026-07-11 09:30" },
  { id: "p8", category: "package", region: "국내 제주", title: "제주도 프리미엄 렌터카 완벽 일주 2박3일", price: "450,000", tags: "제주도,자유일정,렌터카포함", createdAt: "2026-07-08 13:15" },
  { id: "p9", category: "golf", region: "필리핀 클락", title: "필리핀 클락 3색 무제한 라운딩 3박5일", price: "1,190,000", tags: "클락,무제한,추천", createdAt: "2026-07-14 15:00" },
  { id: "p10", category: "golf", region: "국내 제주", title: "제주 명품 골프 & 프라이빗 요트 투어 1박2일", price: "590,000", tags: "제주,VIP,법인추천", createdAt: "2026-07-13 11:20" },
  { id: "p11", category: "airhotel", region: "일본 도쿄", title: "도쿄 긴자 중심가 쇼핑 & 미식 2박3일 에어텔", price: "890,000", tags: "도쿄,시내접근성,조식포함", createdAt: "2026-07-16 10:10" },
  { id: "p12", category: "airhotel", region: "미주 괌", title: "괌 투몬비치 4성급 리조트 호캉스 3박4일", price: "1,190,000", tags: "투몬비치,가족여행,렌터카특가", createdAt: "2026-07-09 09:45" },
  { id: "p13", category: "group", region: "대만 타이베이", title: "대만 타이베이/지우펀 미식 효도여행 3박4일", price: "690,000", tags: "지우펀,노쇼핑,온천포함", createdAt: "2026-07-17 14:00" },
  { id: "p14", category: "group", region: "일본 큐슈", title: "큐슈 유후인 료칸 가이세키 온천 힐링 2박3일", price: "890,000", tags: "유후인,효도여행,여유로운일정", createdAt: "2026-07-07 16:00" }
];

var ADMINS_SEED = [
  { id: "a1", loginId: "admin", name: "김주란", phone: "02-998-3091", email: "admin@anytour.co.kr", role: "슈퍼관리자", status: "사용", createdAt: "2026-01-05 09:00" }
];

var NOTICES_SEED = [
  { id: "n1", title: "애니투어 홈페이지 오픈 안내", content: "안녕하세요, 애니투어입니다. 새롭게 홈페이지를 오픈하였습니다.", pinned: true, visible: true, views: 128, createdAt: "2026-07-28 11:45" },
  { id: "n2", title: "반려동물 동반여행 상품 사전 상담 접수 안내", content: "반려동물 동반여행 신규 상품 사전 상담을 접수받고 있습니다.", pinned: false, visible: true, views: 64, createdAt: "2026-07-21 10:10" },
  { id: "n3", title: "개인정보처리방침 제정 안내", content: "개인정보처리방침이 제정되어 안내드립니다.", pinned: false, visible: true, views: 41, createdAt: "2026-07-21 09:00" },
  { id: "n4", title: "국내외 여행 표준약관 게시 안내", content: "국내외 여행 표준약관을 게시하였습니다.", pinned: false, visible: false, views: 12, createdAt: "2026-07-21 09:00" }
];

var FAQ_SEED = [
  { id: "f1", question: "상담 신청 후 답변은 얼마나 걸리나요?", answer: "문의·예약 페이지로 접수해 주시면 담당자 확인 후 답변드리며, 신청하신 이메일로도 안내 메일을 보내드립니다.", visible: true, order: 1, createdAt: "2026-07-01 10:00" },
  { id: "f2", question: "반려동물 동반여행 상담 절차가 궁금해요.", answer: "반려동물 동반이 가능한 숙소·항공편을 먼저 확인해 안내해 드리며, 견종·크기·목적지에 따라 조건이 달라질 수 있습니다.", visible: true, order: 2, createdAt: "2026-07-01 10:05" },
  { id: "f3", question: "예약금·결제는 어떻게 진행되나요?", answer: "견적 확정 후 안내되는 계좌로 예약금을 입금하시면 예약이 확정됩니다. 잔금은 출발 전 별도 안내드립니다.", visible: true, order: 3, createdAt: "2026-07-01 10:10" },
  { id: "f4", question: "인바운드(외국인 대상) 상담도 가능한가요?", answer: "네, 영어·중국어·일본어 통역 가이드 상담이 가능합니다.", visible: true, order: 4, createdAt: "2026-07-01 10:15" }
];

var INQUIRIES_SEED = [
  { id: "q1", name: "정민아", phone: "010-1234-5678", email: "minah@example.com", type: "반려동물 동반여행", message: "소형견 1마리 동반 가능한 제주 숙소 문의드립니다.", status: "대기", createdAt: "2026-07-29 14:20" },
  { id: "q2", name: "홍길동", phone: "010-2345-6789", email: "gildong@example.com", type: "패키지", message: "가족 4인 다낭 풀빌라 패키지 견적 부탁드립니다.", status: "처리중", createdAt: "2026-07-28 09:40" },
  { id: "q3", name: "이서준", phone: "010-3456-7890", email: "seojun@example.com", type: "골프·테마", message: "필리핀 클락 골프 3박5일 일정 문의합니다.", status: "완료", createdAt: "2026-07-25 16:10" },
  { id: "q4", name: "김하은", phone: "010-4567-8901", email: "haeun@example.com", type: "인바운드", message: "외국인 친구와 함께할 서울 1박2일 투어 상담 원해요.", status: "대기", createdAt: "2026-07-30 11:05" }
];

var REVIEWS_SEED = [
  { id: "r1", rating: 5, title: "강아지랑 처음 떠난 국내 여행, 걱정 없었어요", content: "동반 가능 숙소부터 준비물까지 꼼꼼히 안내해 주셔서 편하게 다녀왔습니다.", category: "pet", photo: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=600", createdAt: "2026-07-24 10:00" },
  { id: "r2", rating: 5, title: "항공 규정까지 꼼꼼하게 챙겨주셔서 감사했어요", content: "반려동물 항공 반입 규정을 미리 안내받아 출국 당일 문제 없이 진행됐습니다.", category: "pet", photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", createdAt: "2026-07-20 14:30" },
  { id: "r3", rating: 5, title: "통역 가이드 덕분에 편하게 다녀왔습니다", content: "영어 통역 가이드분이 친절하게 안내해 주셔서 만족스러운 여행이었습니다.", category: "inbound", photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600", createdAt: "2026-07-18 09:15" },
  { id: "r4", rating: 4, title: "일정이 알차고 가이드분이 친절하셨어요", content: "짧은 일정이었지만 핵심 코스 위주로 알차게 구성해 주셨습니다.", category: "inbound", photo: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600", createdAt: "2026-07-15 17:20" },
  { id: "r5", rating: 5, title: "부모님 모시고 간 효도여행, 정말 만족했어요", content: "이동 동선이 편하고 식사 구성도 좋아서 부모님이 매우 만족하셨습니다.", category: "group", photo: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400", createdAt: "2026-07-12 11:40" },
  { id: "r6", rating: 5, title: "그린피 포함이라 가격도 합리적이었어요", content: "그린피·캐디피 전부 포함이라 추가 비용 걱정 없이 즐길 수 있었습니다.", category: "golf", photo: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400", createdAt: "2026-07-09 13:05" },
  { id: "r7", rating: 4, title: "왕복 항공 포함이라 예약이 편했어요", content: "항공·호텔이 한번에 묶여있어 예약 과정이 간편했습니다.", category: "airhotel", photo: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400", createdAt: "2026-07-05 16:00" },
  { id: "r8", rating: 2, title: "숙소 위치가 생각보다 외곽이었어요", content: "사진과 다르게 시내 접근성이 아쉬웠습니다. 위치 안내가 더 정확했으면 좋겠습니다.", category: "airhotel", photo: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600", createdAt: "2026-06-30 10:20" }
];
