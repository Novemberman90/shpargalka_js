 <?php
  $method = $_SERVER['REQUEST_METHOD'];
  $c = true;

  // Декодируем JSON, чтобы работать с данными
  $_POST = json_decode(file_get_contents("php://input"), true);

  // Токен бота
  $botToken = "7693627283:AAEWUdGoAA8Rl_ZbChQQfsMCvwLkUshmP28";
  // ID вашего чата
  $chatId = "-1002395193276";

  // Получение данных из формы
  $data = json_decode(file_get_contents("php://input"), true);

  if ($data) {
    $name = $data['Name'] ?? 'Без имени';
    $phone = $data['Phone'] ?? 'Без телефона';
    $projectName = $data['project_name'] ?? 'Не указан проект';
    $formSubject = $data['form_subject'] ?? 'Нет темы';

    // Создание сообщения для Telegram
    $message = "🔔 Новое сообщение с сайта:\n\n";
    $message .= "📌 Проект: $projectName\n";
    $message .= "📋 Тема: $formSubject\n";
    $message .= "👤 Имя: $name\n";
    $message .= "📞 Телефон: $phone";

    // URL для отправки сообщения в Telegram
    $url = "https://api.telegram.org/bot$botToken/sendMessage";

    // Данные для запроса
    $postData = [
      'chat_id' => $chatId,
      'text' => $message,
      'parse_mode' => 'HTML'
    ];

    // Отправка сообщения в Telegram
    $options = [
      'http' => [
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($postData),
      ],
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    // Ответ клиенту
    if ($result) {
      echo json_encode(["message" => "Сообщение отправлено успешно!"]);
    } else {
      echo json_encode(["message" => "Ошибка отправки сообщения."]);
    }
  } else {
    echo json_encode(["message" => "Некорректные данные."]);
  }
