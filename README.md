# Flutter fast anotation generator

This is simple generator freezed, json, retrofit

You must type 'freezed' to generate a frozen file.
I made the prefix 'freezed' snippet.
Save time

```
// if u type freezed
freezed ⤵

import 'package:freezed_annotation/freezed_annotation.dart';
part '.freezed.dart';

@freezed
class  with _$ {
}

```

## Fetures

- freezed: freezed generator
- freezedwithjson: freezed with fromjson, tojson
- jsonserialize: jsonserialize generator
- jsonserializegeneric: jsonserialize using generic
- retrofit: retrofit generator

## build_runner shortcut

cmd + shift + b -> flutter pub run build_runner build
