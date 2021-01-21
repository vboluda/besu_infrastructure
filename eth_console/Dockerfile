FROM ubuntu:18.04

USER root

RUN apt-get update && apt-get install -y openssh-server
RUN apt-get install curl sudo git -y
RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
RUN apt-get install nodejs -y
RUN mkdir /var/run/sshd
RUN useradd -d /console -s /console/shell.sh --create-home console
RUN echo 'console:oper2020!' | chpasswd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

WORKDIR /console
COPY shell.sh .
RUN chmod 755 shell.sh
RUN mkdir eth-rpl-console
COPY eth-rpl-console/ eth-rpl-console/
WORKDIR /console/eth-rpl-console
RUN npm install
WORKDIR /console
RUN chown -R console:console *



EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]

