pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'nikhilabba12/food-backend'
        FRONTEND_IMAGE = 'nikhilabba12/food-frontend'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                bat 'docker build -t %BACKEND_IMAGE%:%IMAGE_TAG% ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat 'docker build -t %FRONTEND_IMAGE%:%IMAGE_TAG% ./frontend'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                bat 'docker push %BACKEND_IMAGE%:%IMAGE_TAG%'
            }
        }

        stage('Push Frontend Image') {
            steps {
                bat 'docker push %FRONTEND_IMAGE%:%IMAGE_TAG%'
            }
        }

        stage('Build Report') {
            steps {
                bat 'echo Backend image: %BACKEND_IMAGE%:%IMAGE_TAG% > build-report.txt'
                bat 'echo Frontend image: %FRONTEND_IMAGE%:%IMAGE_TAG% >> build-report.txt'
                bat 'type build-report.txt'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
        }
    }
}