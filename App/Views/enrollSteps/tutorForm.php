<div id="tutor" class="form-step" data-title="Dados pessoais encarregado de educação">
    <div class="form-group">
        <div class="form-control">
            <label for="fullname-input">Nome<sup>*</sup></label>
            <input type="text" name="fullname" id="fullname-input" placeholder="Escreva o nome do encarregado">
        </div>
        <div class="form-control">
            <label for="next-of-kin-input">Grau de parentesco<sup>*</sup></label>
            <input type="text" name="next_of_kin" id="next-of-kin-input" placeholder="ex: Pai">
        </div>
    </div>
    <div class="form-group">
        <button id="same-address" class="dark">Usar anterior</button>
        <div class="form-control">
            <label for="address-input">Morada<sup>*</sup></label>
            <input type="text" name="address" id="address-input" placeholder="ex: Rua A, n. 1, 1-drt.">
        </div>
        <div class="form-control-h">
            <div class="form-control">
                <label for="pob-input">C. Postal<sup>*</sup></label>
                <input type="text" name="pob" id="pob-input" placeholder="ex: 1700-123">
            </div>
            <div class="form-control">
                <label for="mobile-input">Telemóvel<sup>*</sup></label>
                <input type="text" name="mobile" id="mobile-input" placeholder="ex: 92 222 22 22">
            </div>
        </div>
        <div class="form-control-h">
            <div class="form-control">
                <label for="home-phone-input">Tel. casa</label>
                <input type="text" name="home_phone" id="home-phone-input" placeholder="ex: 21 222 22 22">
            </div>
            <div class="form-control">
                <label for="work-phone-input">Tel. emprego</label>
                <input type="text" name="work_phone" id="work-phone-input" placeholder="ex: 21 222 22 22">
            </div>
        </div>
    </div>

    <div class="form-group">
        <div class="form-control">
            <label for="email-input">Email<sup>*</sup></label>
            <input type="email" name="email" id="email-input" placeholder="ex: email@email.com">
        </div>
    </div>

    <div id="auth-persons" class="form-group">
        <p>Autoriza o educando a sair sozinho do centro de estudo <strong>Na Ponta da Língua?</strong><sup>*</sup></p>
        <div class="form-control-h centered">
            <div class="form-control-c">
                <label for="auth-yes">Autorizo</label>
                <input type="radio" name="auth" id="auth-yes" value="1">
            </div>
            <div class="form-control-c">
                <label for="auth-no">Não Autorizo</label>
                <input type="radio" name="auth" id="auth-no" value="0">
            </div>
        </div>
        <p>Pessoas autorizadas a vir buscar o educando</p>
        <div class="form-control">
            <div class="iconed right">
                <input type="text" id="auth-input" placeholder="Nome da pessoa autorizada">
                <button id="add-button" class="icon"><?= icon('add') ?></button>
            </div>
        </div>
        <div id=persons-container></div>
    </div>
</div>