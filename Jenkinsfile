pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nikhilabba12/food-menu-app'
        IMAGE_TAG = 'latest'
        CONTAINER_NAME = 'food-menu-container'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Check Files') {
            steps {
                bat 'dir'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:%IMAGE_TAG% .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat 'docker push %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Pull Docker Image') {
            steps {
                bat 'docker pull %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Trigger Render Deploy') {
            steps {
                withCredentials([string(credentialsId: 'render-deploy-hook', variable: 'RENDER_HOOK')]) {
                    bat 'curl -X POST "%RENDER_HOOK%"'
                }
            }
        }

        stage('Remove Old Container') {
            steps {
                bat 'docker rm -f %CONTAINER_NAME% || exit 0'
            }
        }

        stage('Run Docker Container') {
            steps {
                bat 'docker run -d -p 8081:80 --name %CONTAINER_NAME% %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Build Report') {
            steps {
                bat 'echo Build completed successfully > build-report.txt'
                bat 'echo Image: %IMAGE_NAME%:%IMAGE_TAG% >> build-report.txt'
                bat 'echo Render deploy triggered >> build-report.txt'
                bat 'echo Container: %CONTAINER_NAME% >> build-report.txt'
                bat 'type build-report.txt'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
        }
        success {
            echo 'Pipeline completed successfully'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}