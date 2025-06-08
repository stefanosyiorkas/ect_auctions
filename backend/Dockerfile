FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN ./mvnw dependency:go-offline

COPY src ./src
COPY src/main/resources/keystore.p12 /app/keystore.p12

RUN ./mvnw package -DskipTests

CMD ["java", "-jar", "target/ect-0.0.1-SNAPSHOT.jar"]
