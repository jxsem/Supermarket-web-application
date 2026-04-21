# --- ETAPA 1: Compilación ---
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
# Copiamos el pom y descargamos dependencias (aprovecha la caché de Docker)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiamos el código y compilamos
COPY src ./src
RUN mvn clean package -DskipTests

# --- ETAPA 2: Ejecución ---
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
# Copiamos el .jar generado en la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Configuración de memoria para el plan Free de Render (512MB)
# Asignamos 256MB a la Heap para dejar espacio al sistema
ENTRYPOINT ["java", "-Xmx256m", "-Xms128m", "-jar", "app.jar"]

EXPOSE 8080