pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Misha1207-code/DevSecOps-Project.git'
            }
        }

        stage('Code Analysis') {
            steps {
                echo 'Running basic security checks (HTML project)...'
            }
        }

       

        stage('Build Docker Image') {
            steps {
                sh "docker build -t savisaini123/yourhtmlsite:latest ."
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )]) {
                    sh "echo \$PASSWORD | docker login -u \$USERNAME --password-stdin"
                    sh "docker push savisaini123/yourhtmlsite:latest"
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment step for static HTML container...'
            }
        }
        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('MySonar') {
                    sh 'sonar-scanner'
                }
            }
        }
        stage('Dependency Check') {
            steps {
                sh './dependency-check/bin/dependency-check.sh --scan . --format HTML --out dep-report'
                archiveArtifacts artifacts: 'dep-report/*'
            }
        }
        stage('Trivy Scan') {
            steps {
                sh 'trivy image smartcampus > trivy-report.txt'
                archiveArtifacts artifacts: 'trivy-report.txt'
            }
        }
        script {
            def critical = sh(script: "grep -c 'CRITICAL' trivy-report.txt || true", returnStdout: true).trim()
            if (critical.toInteger() > 0) {
                error("CRITICAL vulnerabilities found in image!")
            }
        }

    }
}
