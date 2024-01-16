FROM node:20.10.0 as builder

# root directory에 파일이 안 담기게 하기 위해 설정
WORKDIR /app

# package.json 이름을 가진 파일을 도커의 ./ 경로에 저장한다(복사)
COPY package.json ./

# npm install은 package.json에 있는 종속성을 설치해준다.
RUN npm install

# 모든 파일을 도커의 ./ 경로에 저장한다
COPY ./ ./

RUN npm run build

CMD ["npm", "run", "serve"]

# nginx
FROM nginx

# 위에 as로 설정한 FROM의 이름의 /app 경로에 있는 것을 nginx의 /usr/share/nginx/html 경로에 복사한다(기본 nginx 실행경로)
COPY --from=builder /app /usr/share/nginx/html