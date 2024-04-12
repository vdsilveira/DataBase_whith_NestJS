## inicializaçao do nest:

,,,
npx @nestjs/cli new NOME_DA_PASTA

,,,,

## configurações para banco de dados:

,,,

npm i nanoid@3 sqlite3 typeorm @nestjs/typeorm class-validator class-transformer

,,,

## CRIAÇÃO DE TABELA 

,,,

nest g resource NOME_DA_TABELA
,,,
`na pasta src sera criado um pasta para a tabela`
## INICIALIZAÇO DO NEST

,,,

npm run start:dev
,,,

### extensoes do vs code:

`REST Client - Huachao Mao`
`com a extensao Rest Client entre na pasta da tabela e crie um aquivo .http assim vc congue ver as respotas de send request  `

### adicionar colunas de tabela:

`dentro de .user/dto/create-user.dto.ts  crie as colunas da tabela com @Annotation de verificaçao`

### habilitar verificação da tabela 

`dentro de .src/main.ts  adicione o seguinte trexo de codigo:`
,,,

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();

,,,

`OBS: app.useglobalPipes foi adicionado para habilitar verificaçao da tabela pelos annotation's`

## conexao Type_ORM:

`dentro de .src/app.modules.ts  adicione o seguinte trexo de codigo`


`OBS: (synchronize: true) serve apenas para desenvolvimento`

,,,

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.marketplace',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
,,,


`dentro de .src/user/user.modules.ts  adicione o seguinte trexo de codigo:`

adicionamos o importe

,,,

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
,,,

## adicionando entities no db

`dentro de .src/user/entities/user.entity.ts  adicione o seguinte trexo de codigo:`

,,,

import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { nanoid } from 'nanoid';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  privateKey: string;

  @Column()
  senha: string;

  @Column()
  acessType: string;

  @BeforeInsert()
  generateId() {
    this.id = `user_${nanoid()}`;
  }
}
,,,

## modificando o User.service

`dentro de .src/user/user.service.ts  adicione o seguinte trexo de codigo:`

,,,

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user)
    private readonly repository: Repository<user>,
  ) {}

  create(dto: CreateUserDto) {
    const User = this.repository.create(dto);
    return this.repository.save(User);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) return null;
    this.repository.merge(user, dto);
    return this.repository.save(user);
  }

  async remove(id: string) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) return null;
    return this.repository.remove(user);
  }
}
,,,


