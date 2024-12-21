FROM postgres:15-alpine

# Copiar el script de inicialización
COPY init.sql /docker-entrypoint-initdb.d/

# Configurar permisos
RUN chmod a+r /docker-entrypoint-initdb.d/*