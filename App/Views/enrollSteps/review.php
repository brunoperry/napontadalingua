<div id="review" class="form-step" data-title="Revisão">
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

    <div class="review-section">
        <div class="review-item">
            <label>Serviço</label>
            <p id="review-service">...</p>
        </div>
        <div class="review-item">
            <label>Modalidade</label>
            <p id="review-modality">...</p>
        </div>
        <div class="review-item">
            <label>Horário</label>
            <ul id="review-timetable">

            </ul>
        </div>
    </div>
    <div class="review-section">
        <h3>Dados pessoais do aluno</h3>
        <div class="review-item">
            <label>Nome</label>
            <p id="review-student-fullname">...</p>
        </div>
        <div class="review-item">
            <label>Morada</label>
            <p id="review-student-address">...</p>
        </div>
        <div class="review-item">
            <label>C. Postal</label>
            <p id="review-student-pob">...</p>
        </div>
        <div class="review-item">
            <label>Telemóvel</label>
            <p id="review-student-mobile">...</p>
        </div>
        <div class="review-item">
            <label>Data de nascimento</label>
            <p id="review-student-dob">...</p>
        </div>
        <div class="review-item">
            <label>C.C</label>
            <p id="review-student-cc">...</p>
        </div>
        <div class="review-item">
            <label>N.I.F</label>
            <p id="review-student-nif">...</p>
        </div>
        <div class="review-item">
            <label>S.N.S</label>
            <p id="review-student-sns">...</p>
        </div>
        <div class="review-item">
            <label>Escola, ano e turma</label>
            <p id="review-student-school">...</p>
        </div>
        <div class="review-item">
            <label>Observações/Cuidados especiais</label>
            <p id="review-student-notes">...</p>
        </div>
    </div>
    <div class="review-section">
        <h3>Dados pessoais encarregado de educação</h3>
        <div class="review-item">
            <label>Nome</label>
            <p id="review-tutor-fullname">...</p>
        </div>
        <div class="review-item">
            <label>Grau de parentesco</label>
            <p id="review-tutor-next-of-kin">...</p>
        </div>
        <div class="review-item">
            <label>Morada</label>
            <p id="review-tutor-address">...</p>
        </div>
        <div class="review-item">
            <label>C. Postal</label>
            <p id="review-tutor-pob">...</p>
        </div>
        <div class="review-item">
            <label>Telemóvel</label>
            <p id="review-tutor-mobile">...</p>
        </div>
        <div class="review-item">
            <label>Tel. casa</label>
            <p id="review-tutor-home-phone">...</p>
        </div>
        <div class="review-item">
            <label>Tel. emprego</label>
            <p id="review-tutor-work-phone">...</p>
        </div>
        <div class="review-item">
            <label>Email</label>
            <p id="review-tutor-email">...</p>
        </div>
    </div>
    <div class="review-section">
        <h3>Autorizações</h3>
        <div class="review-item">
            <label>Autorizada a saída do aluno sozinho</label>
            <p id="review-auth-leave">...</p>
        </div>
        <div class="review-item">
            <label>Pessoas autorizadas a buscar o aluno</label>
            <ul id="review-auth-persons">

            </ul>
        </div>
    </div>
</div>