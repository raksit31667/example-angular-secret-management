pipeline {
  agent { label 'nodejs' }

  environment {
    NAMESPACE = sh(script: "cat '/var/run/secrets/kubernetes.io/serviceaccount/namespace'", returnStdout: true).trim()
    repoName = "example-angular-secret-management"
  }
  stages {
    stage('Install dependencies') {
      steps {
        script {
          sh "npm install"
        }
      }
    }
    stage('Import environment file') {
      steps {
        script {
          withCredentials([string(credentialsId: "${env.NAMESPACE}-dotenv", variable: 'DOTENV')]) {
            def dotenvFile = readJSON text: DOTENV
            def dotenvFileValueEncoded = dotenvFile.get(".env")
            def dotenvFileContent = new String(dotenvFileValueEncoded.decodeBase64())

            writeFile file: '.env', text: dotenvFileContent
          }
        }
      }
    }
    stage('Unit Test') {
      steps {
        script {
          sh "npm test"
        }
      }
    }
    stage("Build & Push Docker image to ECR") {
      agent { label 'ecr' }
      steps {
        script {
          def shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:\"%h\"")

          withCredentials([usernamePassword(credentialsId: "${env.NAMESPACE}-ecr", usernameVariable: "AWS_ACCESS_KEY_ID", passwordVariable: "AWS_SECRET_ACCESS_KEY")]) {
            sh """
              aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 564702493239.xyz.ecr.ap-southeast-1.amazonaws.com
              docker build -t 564702493239.xyz.ecr.eu-central-1.amazonaws.com/example-angular-secret-management:latest .
              docker tag 564702493239.xyz.ecr.eu-central-1.amazonaws.com/example-angular-secret-management:latest 564702493239.xyz.ecr.eu-central-1.amazonaws.com/example-angular-secret-management:$shortCommit
              docker push 564702493239.xyz.ecr.eu-central-1.amazonaws.com/example-angular-secret-management:$shortCommit
            """
          }
        }
      }
    }
  }
}
