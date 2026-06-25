# --- Stage 1: Build the jar with Maven ---
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
# Pre-fetch dependencies in their own layer so they're cached between builds
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# --- Stage 2: Run the jar on a slim JRE image ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/backend-1.0.0.jar app.jar

# Render sets PORT automatically; application.properties already reads it
EXPOSE 4000

ENTRYPOINT ["java", "-jar", "app.jar"]
