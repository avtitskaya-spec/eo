FROM mcr.microsoft.com/playwright:v1.57.0-noble
# WORKDIR 
COPY . .
RUN npm ci
CMD ["npm", "t"]