# 콘서트 예매 사이트 API 문서

## 목차
1. [로그인](#로그인)
2. [회원가입](#회원가입)
3. [프로필 보기](#프로필-보기)
4. [새 콘서트 등록 (어드민)](#새-콘서트-등록-어드민)
5. [콘서트 목록 보기](#콘서트-목록-보기)
6. [콘서트 상세보기](#콘서트-상세보기)
7. [콘서트 삭제하기](#콘서트-삭제하기)
8. [좌석을 지정하여 예매하기](#좌석을-지정하여-예매하기)
9. [예매한 티켓 조회하기](#예매한-티켓-조회하기)
10. [예매 취소하기](#예매-취소하기)

## 로그인
**Endpoint:** `/api/auth/signin`  
**Method:** `POST`  
**Request:**  
- email: 사용자 이메일  
- password: 사용자 비밀번호  

**Response:**  
- "accessToken": "jwt token"

## 회원가입
**Endpoint:** `/api/auth/signup`  
**Method:** `POST`  
**Request:**  
- username: 사용자 이름  
- email: 사용자 이메일  
- password: 사용자 비밀번호  
- admin: "true" or "false" (어드민 권한 유무)

**Response:**  
- username: 사용자 이름  
- email: 사용자 이메일  
- password: 사용자 비밀번호  
- admin: "true" or "false" (어드민 권한 유무)
- "id": 유저ID
- "createdAt": 가입날짜

## 프로필 보기
**Endpoint:** `/api/auth/:id`  
**Method:** `GET`  
**Request:** (없음)  

**Response:**  
- id: 유저 id  
- email: 사용자 이메일  
- password: 사용자 비밀번호  
- createdAt: 가입날짜  
- admin: "true" or "false" (어드민 권한 유무)  
- concerts: [해당 유저가 등록한 concerts 배열]

## 새 콘서트 등록 (어드민)
**Endpoint:** `/api/concert/create`  
**Method:** `POST`  
**Request:**  
- title: 제목  
- date: 콘서트 날짜  
- concertTime: 콘서트 시간  
- genre: 장르  
- description: 설명  
- status: "POSSIBLE" or "IMPOSSIBLE" (예매 가능 여부)

**Response:**  
- title: 제목  
- date: 콘서트 날짜  
- concertTime: 콘서트 시간  
- genre: 장르  
- description: 설명  
- status: "POSSIBLE" or "IMPOSSIBLE" (예매 가능 여부)  
- user: {콘서트 작성자 정보}

**기능:**  
- 공연 등록 시 좌석 30개가 자동 생성됩니다.

## 콘서트 목록 보기
**Endpoint:** `/api/concerts`  
**Method:** `GET`  
**Request:** (없음)  

**Response:**  
- id: 콘서트 ID  
- title: 콘서트 제목  
- date: 콘서트 날짜 및 시간  
- concertTime: 콘서트 시간  
- genre: 콘서트 장르  
- description: 콘서트 설명  
- status: "POSSIBLE" or "IMPOSSIBLE" (예매 가능 여부)

## 콘서트 상세보기
**Endpoint:** `/api/concert/:id`  
**Method:** `GET`  
**Request:** (없음)  

**Response:**  
- id: 콘서트 ID  
- title: 콘서트 제목  
- date: 콘서트 날짜 및 시간  
- concertTime: 콘서트 시간  
- genre: 콘서트 장르  
- description: 콘서트 설명  
- status: "POSSIBLE" or "IMPOSSIBLE" (예매 가능 여부)

## 콘서트 삭제하기
**Endpoint:** `/api/concert/:id`  
**Method:** `DELETE`  
**Request:** (없음)  

**Response:** (없음)

## 좌석을 지정하여 예매하기
**Endpoint:** `/api/tickets/ticketing`  
**Method:** `POST`  
**Request:**  
- concertId: 예매하고자 하는 공연 ID    
- seatNumber: 예매하고자 하는 좌석 번호  

**Response:**  
- seatNumber: 예매 완료한 좌석 번호  
- user: {예매한 유저 정보}  
- concert: {예매한 콘서트 정보}

**기능:**  
- 유저 포인트 차감  
- 유저 포인트 히스토리 자동 생성  
- 예매 가능한 좌석 DB에서 예매 완료한 좌석 자동 삭제

## 예매한 티켓 조회하기
**Endpoint:** `/api/reservation/confirmation`  
**Method:** `GET`  
**Request:**  
- reservationId: 예약 ID  

**Response:**  
- reservationId: 예약 ID  
- concertId: 공연 ID  
- userId: 사용자 ID  
- seatNumbers: 예매된 좌석 번호 목록  
- status: 예매 확인 상태  

## 예매 취소하기
**Endpoint:** `/api/reservation/cancel`  
**Method:** `POST`  
**Request:**  
- reservationId: 예약 ID  

**Response:**  
- message: 예매 취소 완료 메시지
