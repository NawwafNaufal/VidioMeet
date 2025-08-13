const htmlEmail = (username,otp) => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brawl Stars Login</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            padding: 40px;
            max-width: 400px;
            width: 100%;
            text-align: center;
            position: relative;
            overflow: hidden;
        }



        .welcome-title {
            font-size: 32px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            position: relative;
        }



        .instruction-text {
            font-size: 16px;
            color: #495057;
            margin-bottom: 25px;
            line-height: 1.5;
            position: relative;
        }

        .code-display {
            background: linear-gradient(135deg, #4285f4, #3367d6);
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 8px;
            box-shadow: 0 8px 16px rgba(66, 133, 244, 0.3);
            position: relative;
            z-index: 1;
            transition: transform 0.2s ease;
        }

        .code-display:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 20px rgba(66, 133, 244, 0.4);
        }

        @media (max-width: 480px) {
            .container {
                padding: 30px 20px;
            }
            
            .welcome-title {
                font-size: 24px;
            }
            
            .code-display {
                font-size: 28px;
                letter-spacing: 4px;
                padding: 15px 20px;
            }
        }


    </style>
</head>
<body>
    <div class="container">
        <h1 class="welcome-title">Welcome  ${username}</h1>
        
        <div class="instruction-text">
            If you requested to log in, use the code below.
        </div>
        
        <div class="code-display">
            ${otp}
        </div>
    </div>
</body>
</html>`
return html

}

module.exports = htmlEmail