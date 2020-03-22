FROM maven:3.6-jdk-11-slim AS builder

WORKDIR /app

COPY pom.xml .
COPY src ./src
RUN mvn -e -B package

FROM openjdk:11-jre

COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar /app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
