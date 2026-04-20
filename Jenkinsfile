pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nikhilabba12/food-menu-app'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Show Files') {
            steps {
                bat 'dir'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:%IMAGE_TAG% .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_TOKEN')]) {
                    bat 'docker login -u %DOCKERHUB_USER% -p %DOCKERHUB_TOKEN%'
                }
            }
        }

        stage('Docker Push') {
            steps {
                bat 'docker push %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Trigger Render Deploy') {
            steps {
                withCredentials([string(credentialsId: 'render-deploy-hook', variable: 'RENDER_HOOK')]) {
                    bat 'curl -X POST "%RENDER_HOOK%"'
                }
            }
        }
    }

    post {
        success {
            bat 'echo Pipeline completed successfully > build-report.txt'
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
        }
        failure {
            bat 'echo Pipeline failed > build-report.txt'
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
        }
    }
}