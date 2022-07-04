# Coding Convetion

[Naver JavaScript Style Guide](https://github.com/naver/eslint-config-naver/blob/master/STYLE_GUIDE.md)를 바탕으로 작성되었습니다.

## 소스 파일 규칙

- 1.1 back/db/models, front/components : PascalCase
- 1.2 back > db/schemas, middlewares, routers, services : camelCase

## References

> Naver와 동일

- 2.1 변수 선언은 가급적 `const`를 사용하고, `var`를 사용하지 않는다.
- 2.2 참조를 재할당 해야 한다면 `var` 대신 `let`을 사용한다.
- 2.3 `let`과 `const`는 선언된 블록 안에서만 존재하는 블록 스코프이다.

## Objects

- 3.1 오브젝트를 작성할 때는, 리터럴 구문을 사용한다.

```javascript
const item = {};
```

- 3.2 속성의 단축 구문을 이용한다.

```javascript
const lukeSkywalker = "Luke Skywalker";

const obj = {
  lukeSkywalker,
};
```

- 3.3 속성의 단축 구문은 오브젝트 선언 시작 부분에 그룹화한다.

```javascript
const anakinSkywalker = "Anakin Skywalker";
const lukeSkywalker = "Luke Skywalker";

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  // 단축 속성 구문 - 시작
  lukeSkywalker,
  anakinSkywalker,
  // 단축 속성 구문 - 끝
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```

## Arrays

- 4.1 배열을 작성할 때는, 리터럴 구문을 사용한다.

```javascript
const items = [];
```

- 4.2 배열을 복사할 때는, 배열의 spread 연산자(`...`)를 이용한다.

```javascript
const itemsCopy = [...items];
```

## Strings

- 5.1 따옴표는 쌍따옴표를 사용한다.
- 5.2 프로그램에서 문자열을 생성하는 경우는, 문자열 연결이 아닌 template strings를 이용한다.

```javascript
// bad
function sayHi(name) {
  return "How are you, " + name + "?";
}

// good
function sayHi(name) {
  return `How are you, ${name}?`;
}
```

## Functions

- 6.1 함수 스타일에 대해서는 별도의 스타일 가이드를 제공하지 않는다.
- 6.2 익명 함수는 function과 `()`, 기명 함수는 함수 이름과 `()` 사이에 공백이 없다.  
  async arrow function인 경우, async와 arrow function 사이에 공백이 있다.

```javascript
// bad
const f = function () {};
const g = function a() {};
const h = async (v, i) => {};

// good
const x = function () {};
const y = function a() {};
const z = async (v, i) => {};
```

## Arrow Functions

- 7.1 익명 함수를 전달하는 경우, arrow function 표기를 이용한다.

```javascript
// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

- 7.2 함수의 몸체(body)가 단일 표현식이라면 중괄호(`{}`)를 생략하고, 묵시적으로 그 값은 반환값이 된다. 그렇지 않으면, 중괄호(`{}`)는 생략할 수 없고, 반환값이 필요한 경우는 return 을 명시한다.  
  [코드 예시 참조](https://github.com/naver/eslint-config-naver/blob/master/STYLE_GUIDE.md#8.2)

- 7.3 함수가 단일 파라미터인 경우, 소괄호(`()`)는 생략한다.

```javascript
[1, 2, 3].map((x) => x * x);

[1, 2, 3].map(
  (number) =>
    `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
);

[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

- 7.4 arrow function 문법(`=>`)과 비교 연산자 (`<=`, `>=`)를 함께 사용할 경우, 소괄호(`()`)를 이용하여 혼란스럽지 않도록 표현한다.

## Modules

- 8.1 `import`/`export`를 항상 사용한다.
- 8.2 import는 중복되지 않게 한 곳에서 import 한다.
- 8.3 모든 import문은 상위에 위치한다.

## Variables

- 9.1 변수 선언은 변수당 하나씩 사용한다.
- 9.2 우선 `const`를 그룹화하고, 다음에 `let`을 그룹화한다.
- 9.3 여러 개의 변수를 한 줄에 동일한 값으로 설정하지 않는다.
- 9.4 `++`, `--` 연산자 사용이 가능하다. 연산자와 피연산자 사이에 공백을 두지 않는다.

## Comparison Operators & Equality

- 10.1 `==` 이나 `!=` 보다 `===` 와 `!==` 을 사용한다.
- 10.2 `case`, `default` 구문에서 `let`, `const`, `function`, `class`가 사용되는 경우에는 중괄호(`{}`)를 사용한다.

```javascript
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {
      // ...
    }
    break;
  }
  case 4:
    bar();
    break;
  default: {
    class C {}
  }
}
```

## Blocks

- 11.1 중괄호(`{}`)는 클래스, 메서드, 제어문의 블럭을 구분한다. 중괄호는 클래스 선언, 메서드 선언, 조건/반복문/제어문,줄의 마지막에서 시작한다.

```javascript
// bad
const Empty = function () {};

// good
const Empty = function () {};
```

- 11.2 조건/반복문/제어문에 중괄호 사용한다. 조건/반복문/제어문이 한줄로 끝이라도 중괄호를 활용한다.

```javascript
// bad
if (exp == null) return false;
for (var i in obj) if (i === "key") return obj[i];

// good
if (exp == null) {
  return false;
}
```

## Comments

- 12.1 기본적으로 Best Comments 확장 프로그램을 이용하기로 한다.
- 12.2 복수행의 코멘트는 `/** ... */`을 사용한다.
- 12.3 단일행 코멘트에는 `//` 을 사용한다. 또한, 코멘트의 앞에 공백을 넣는다.
- 12.4 구현이 필요하다는 주석으로 `// TODO:` 를 사용한다.
- 12.5 중요한 내용인 경우 단일행 코멘트는 `// *`, 복수행 코멘트는 `/* ... */`을 사용한다.

## Whitespace

- 13.1 공백은 탭(2)을 사용한다.
- 13.2 주요 중괄호 (`{}`) 앞에는 공백을 1개 넣는다.
- 13.3 제어구문 (`if` 문이나 `while` 문 등) 의 소괄호(`()`) 앞에는 공백을 1개 넣는다.
- 13.4 연산자 사이에는 공백을 넣는다.
- 13.5 메서드 체인이 3개 이상인 경우, 적절히 줄바꿈을 하여 사용한다. 메서드 체이닝을 하여 줄바꿈을 할 때에는 마침표(.)와 함께 줄바꿈을 한다. 줄바꿈 후에는 가독성을 위하여 자동 들여쓰기를 한다.  
  [코드 예시 참조](https://github.com/naver/eslint-config-naver/blob/master/STYLE_GUIDE.md#18.6)

- 13.6 문의 앞과 블록의 뒤에는 빈행을 남겨둔다.
- 13.7 블록에 빈행을 끼워 넣지 않는다.
- 13.8 소괄호(`()`)의 안쪽에 공백을 추가하지 않는다.
- 13.9 대괄호(`[]`)의 안쪽에 공백을 추가하지 않는다.
- 13.10 괄호 안에 공백을 삽입하지 않는다.
- 13.11 최대 줄 너비는 `100`이다.

## Commas

- 14.1 콤마는 뒤에 표기한다.
- 14.2 끝에 콤마를 넣는다.

## Semicolons

- 15.1 `;`은 문장의 끝에 표기한다.

## Type Casting

- 16.1 문자열은 `String()`을 이용한다.
- 16.2 숫자의 경우 `Number()`을 이용하고, `parseInt`나 `parseFloat` 이용 시 주석을 필요로 한다.
- 16.2 불리언의 경우 `Boolean`이나 `!`을 이용한다.

## Naming Conventions

- 17.1 이름의 길이는 2 이상이어야 한다.
- 17.2 함수, 오브젝트, 변수는 camelCase를 사용한다.
- 17.3 클래스는 PascalCase 이용한다.
- 17.4 약어 및 이니셜은 항상 모두 대문자이거나 모두 소문자이어야 한다.
- 17.5 한글 발음을 그대로 사용하지 않는다.
- 17.6 클래스명과 변수명은 `명사` 사용을 준수한다.
- 17.7 상수명은 대문자를 사용하고, 단어와 단어사이는 \_로 연결한다.
- 17.8 함수명은 `동사`나 `동사구` 사용을 준수한다.
