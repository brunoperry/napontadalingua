<div id="student" class="form-step" data-title="Dados pessoais do aluno">
    <div class="meta">
        <h4>
            <p>Aluno número:</p>
            <p id="student-num" class="reg"><?= $data['student_number'] ?></p>
        </h4>
        <h4>
            <p>Ano letivo:</p>
            <p id="year" class="reg"><?= $data['enroll_year'] ?></p>
        </h4>
    </div>

    <div class="form-group">
        <div class="form-control">
            <label for="student-fullname-input">Nome<sup>*</sup></label>
            <input type="text" name="fullname" id="student-fullname-input" placeholder="Escreva o nome do aluno">
        </div>
    </div>
    <div class="form-group">
        <div class="form-control">
            <label for="student-address-input">Morada<sup>*</sup></label>
            <input type="text" name="address" id="student-address-input" placeholder="ex: Rua A, n. 1, 1-drt.">
        </div>
        <div class="form-control-h">
            <div class="form-control">
                <label for="student-pob-input">C. Postal<sup>*</sup></label>
                <input type="text" name="pob" id="student-pob-input" placeholder="ex: 1700-123">
            </div>
            <div class="form-control">
                <label for="student-mobile-input">Telemóvel<sup>*</sup></label>
                <input type="text" name="mobile" id="student-mobile-input" placeholder="ex: 92 222 22 22">
            </div>
        </div>
    </div>

    <div class="form-group">
        <div class="form-control-h">
            <div class="form-control">
                <label for="student-dob-input">Data nascimento<sup>*</sup></label>
                <input type="date" name="dob" id="student-dob-input">
            </div>
            <div class="form-control">
                <label for="student-cc-input">C.C</label>
                <input type="text" name="cc" id="student-cc-input" placeholder="ex: 123456789">
            </div>
        </div>

        <div class="form-control-h">
            <div class="form-control">
                <label for="student-nif-input">N.I.F</label>
                <input type="text" name="nif" id="student-nif-input" placeholder="ex: 123456789">
            </div>
            <div class="form-control">
                <label for="student-sns-input">S.N.S</label>
                <input type="text" name="sns" id="student-sns-input" placeholder="ex: 123456789">
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="form-control">
            <label for="school-input">Escola, ano e turma<sup>*</sup></label>
            <input type="text" name="school" id="school-input" placeholder="ex: Escola A, 5º ano, B">
        </div>
    </div>
    <div class="form-control">
        <label for="notes-input">Observações/Cuidados especiais:</label>
        <textarea name="notes" id="notes-input" rows="10" cols="50">
        </textarea>
    </div>
</div>