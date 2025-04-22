pipeline{
    agent any
    environment{
        DOCKER_HUB_BACK="ujjawalsharma7734/back"
        DOCKER_HUB_FRONT="ujjawalsharma7734/front"
        FRONTENT_IMAGE="ai-frontend"
        BACKEND_IMAGE="ai-backend"
        FRONTEND_DIR=""
        BACKEND_DIR=""
    }
    stages{

          stage('Inject .env') {
            steps {
                withCredentials([string(credentialsId: 'GEMINI_API_KEY', variable: 'GEMINI_KEY')]) {
                    writeFile file: '.env', text: "GEMINI_API_KEY=${env.GEMINI_KEY}"
                }
            }
        }
       
         stage('Stop and Remove Containers') {
            steps {
                bat 'docker compose down || true'
            }
        }

 stage('Build Docker Images') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Tagging and push into Docker Hub'){
            steps{
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat ''' 
                    docker tag %FRONTENT_IMAGE% %DOCKER_HUB_FRONT%
                     docker tag %BACKEND_IMAGE% %DOCKER_HUB_BACK%
                    docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                     docker push %DOCKER_HUB_BACK%
                      docker push %DOCKER_HUB_FRONT%
                    '''
            }
        }
    }

     stage('Start Containers') {
            steps {
                bat 'docker compose up -d'
            }
        }
}

post {
        success {
            mail to: 'ujjawalsharma7734@gmail.com',
                 subject: "✅ Pipeline Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Pipeline ran successfully!\nDocker image pushed to: https://hub.docker.com/repository/docker/${env.DOCKER_HUB_BACK}"
        }
        failure {
            mail to: 'ujjawalsharma7734@gmail.com',
                 subject: "❌ Pipeline Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Pipeline failed. Check logs at: ${env.BUILD_URL}"
        }
    }
}

