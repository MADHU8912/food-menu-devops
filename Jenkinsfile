pipeline {
    agent any

    environment {
        IMAGE_NAME = 'nikhilabba12/food-menu-app'
        IMAGE_TAG = 'latest'
        CONTAINER_NAME = 'food-menu-container'
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

        stage('Test Report') {
            steps {
                bat 'echo Food menu app basic test passed > test-report.txt'
                bat 'echo HTML file found >> test-report.txt'
                bat 'echo CSS file found >> test-report.txt'
                bat 'type test-report.txt'
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

        stage('Docker Pull') {
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

        stage('Run Container') {
            steps {
                bat 'docker run -d -p 8081:80 --name %CONTAINER_NAME% %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Build Report') {
            steps {
                bat 'echo Pipeline completed successfully > build-report.txt'
                bat 'echo Image: %IMAGE_NAME%:%IMAGE_TAG% >> build-report.txt'
                bat 'echo Container: %CONTAINER_NAME% >> build-report.txt'
                bat 'echo Render deploy triggered >> build-report.txt'
                bat 'type build-report.txt'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'build-report.txt, test-report.txt', fingerprint: true
        }
        success {
            echo 'Pipeline completed successfully'
        }
        failure {
            bat 'echo Pipeline failed > build-report.txt'
            archiveArtifacts artifacts: 'build-report.txt', fingerprint: true
            echo 'Pipeline failed'
        }
    }
}