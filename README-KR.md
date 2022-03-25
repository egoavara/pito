# Pito
pito는 타입스크립트를 이용해 정적으로 json-schema를 생성해주는 라이브러리입니다.

단, Pito는 json-schema의 모든 기능을 구현하는 것을 목표로 하지 않습니다.

[json-schema의 표준](https://json-schema.org/specification.html)에 따르면 json-schema는 우리가 일반적으로 사용하는 타입 정의보다, 훨씬 복잡한 경우를 많이 가정하고 있습니다.

이는 json-schema를 통해 타입을 검증하기 이전에 별도로 검증장치가 없었거나, 일반적인 규칙으로 표현하기 힘든 문서가 있는 경우에는 효과적이지만, 
일반적으로 활용하기에는 너무 많은 기능이 있습니다.


따라서 Pito는 자주 사용하는 타입들과 자주 사용되는 스타일 위주로 json-schema를 코드상에서 정적 생성해주는 역활을 하도록 설계되었습니다.

또 Pito는 자바스크립트의 타입을 json-schema로 표현하는 일관적인 방법과, 유틸리티를 제공합니다.

만약 당신이 시간을 다룬다면, node, 혹은 웹에서는 아마 [Date](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date)타입을 사용할 것입니다.

이 경우, json-schema는 Date타입을 표현 불가능하기에, 대개, Date타입을 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601)에 정의된 형태로 string 타입으로 변환합니다.

또, json-schema의 문자열 옵션 중 `format`을 이용해 타입을 제한합니다.

이를 실제 json-schema로 표현하면 다음과 같습니다.
```json
{
    "type" : "string",
    "format" : "date",
}
```
이는 유연하고 훌륭한 방법이지만, 때때로 이렇게 변환된 값을 클라이언트와 서버가 주고받을 때 한가지 불편한 점이 생길 수 있습니다.

만약 서버가 클라이언트에게 시간을 위의 방법을 통해서 전달한다면, 클라이언트는 string 타입을 받게 됩니다.

이때 클라이언트는 이 string 타입을 시간의 대소 비교등을 위해서 다시 `new Date`를 통해 Date 타입으로 변환해야 합니다.

만약 `format`이 `date`라면, 자동으로 [Date](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date)타입으로 전환해주는 기능이 있다면 유용할 것입니다.

간단히 이야기하면, Pito는 **검증에 관해서**는 json-schema의 부분집합입니다. 또한 이에 추가로 json을 자바스크립트 객체로 전환해 주는 유용한 기능들을 추가로 포함하고 있습니다.

## 시작 예시

##