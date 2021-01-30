#default version to latest

FROM hyperledger/besu:latest

# Copy new entrypoint scripts
# COPY --chown=besu:besu *_start.sh /opt/besu/

# Install a dos 2 unix EOL converter (supporting either alpine or ubuntu images)
USER root
RUN mkdir -p /opt/besu/public-keys && chown -R besu:besu /opt/besu/public-keys
RUN apt-get update && apt-get install dos2unix && \
    rm -rf /var/cache/apt/* && rm -rf /var/cache/apk/*

# Run dos2unix EOL conversion on all shell scripts to prevent scripts to fail if edited with a windows IDE
# that rewrote the EOL to CRLF before we build the image. See issue #4
# RUN find /opt/besu/*.sh -type f -print0 | xargs -0 dos2unix

# USER besu

# COPY config/besu.json /config/
# COPY --chown=besu:besu config/validator01/key01 /opt/besu/data/
# COPY --chown=besu:besu config/validator01/Address01 /opt/besu/data/
# RUN ls -l /opt/besu/data/

COPY ./besu.json /config/besu.json

WORKDIR /opt/besu

# specify default entrypoint to start the node
ENTRYPOINT ["/opt/besu/bin/besu"]
